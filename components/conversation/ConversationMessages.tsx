'use client';

import { Fragment, useRef, ElementRef } from 'react';
import { Loader2, ServerCrash } from 'lucide-react';
import { useChatQuery } from '@/hooks/useChatQuery';

import { useChatSocket } from '@/hooks/useChatSocket';
import { useChatScroll } from '@/hooks/useChatScroll';

import { format } from 'date-fns';

import { Message, Profile } from '@prisma/client';

import { ConversationWelcome } from './ConversationWelcome';
import { ConversationItem } from './ConversationItem';

const DATE_FORMAT = 'd MMM yyyy, HH:mm';

type MessageWithProfile = Message & {
    profile: Profile;
};

interface ConversationMessagesProps {
    currentProfile: Profile;
    conversationId: string;
    name: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramValue: string;
}

export const ConversationMessages = ({
    currentProfile,
    conversationId,
    name,
    apiUrl,
    socketUrl,
    socketQuery,
    paramValue,
}: ConversationMessagesProps) => {
    const queryKey = `chat:${conversationId}`;
    const addKey = `chat:${conversationId}:messages`;
    const updateKey = `chat:${conversationId}:messages:update`;

    const chatRef = useRef<ElementRef<'div'>>(null);
    const bottomRef = useRef<ElementRef<'div'>>(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey: 'conversationId',
        paramValue,
    });

    useChatSocket({ addKey, updateKey, queryKey });
    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0,
    });

    if (status === 'pending') {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500 bg:text-zinc-400">Loading messages...</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
                <p className="text-xs text-zinc-500 bg:text-zinc-400">Something went wrong!</p>
            </div>
        );
    }

    return (
        <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
            {!hasNextPage && <div className="flex-1" />}
            {!hasNextPage && <ConversationWelcome name={name} />}

            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
                    ) : (
                        <button
                            onClick={() => fetchNextPage()}
                            className="text-zinc-500 hover:text-zinc-600
                                    dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 
                                    transition"
                        >
                            Load previous messages
                        </button>
                    )}
                </div>
            )}

            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map((message: MessageWithProfile & { is_edited: boolean }) => (
                            <ConversationItem
                                key={message.id}
                                profile={message.profile}
                                currentProfile={currentProfile}
                                id={message.id}
                                content={message.content}
                                deleted={message.deleted}
                                fileUrl={message.fileUrl}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                isUpdated={message.is_edited}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef} />
        </div>
    );
};
