import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatInput } from '@/components/chat/ChatInput';
import { ConversationMessages } from '@/components/conversation/ConversationMessages';
import { getOrCreateConversation } from '@/lib/conversation';

import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';

import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface ConversationIdPageProps {
    params: {
        profileId: string;
    };
}

export default async function ConversationIdPage({ params }: ConversationIdPageProps) {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    if (params.profileId === profile.id) {
        return redirect('/');
    }

    const otherProfile = await db.profile.findFirst({
        where: {
            id: params.profileId,
        },
    });

    if (!otherProfile) {
        return redirect('/');
    }

    const conversation = await getOrCreateConversation(profile.id, otherProfile.id);

    if (!conversation) {
        return redirect('/');
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader type="conversation" name={otherProfile.name} imageUrl={otherProfile.imageUrl} />
            <ConversationMessages
                currentProfile={profile}
                conversationId={conversation.id}
                name={otherProfile.name}
                apiUrl="/api/direct-messages"
                paramValue={conversation.id}
                socketUrl="/api/socket/direct-messages"
                socketQuery={{
                    conversationId: conversation.id,
                }}
            />
            <ChatInput
                type="conversation"
                name={otherProfile.name}
                apiUrl="/api/socket/direct-messages"
                query={{
                    conversationId: conversation.id,
                }}
            />
        </div>
    );
}
