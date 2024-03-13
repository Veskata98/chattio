import { redirect } from 'next/navigation';

import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import DefaultHeader from './DefaultHeader';
import { DefaultProfilesButton } from './DefaultProfilesButton';

export const DefaultSidebar = async () => {
    const profile = await currentProfile();

    if (!profile) {
        redirect('/');
    }

    const conversations = await db.conversation.findMany({
        where: {
            OR: [{ profileOneId: profile.id }, { profileTwoId: profile.id }],
        },
        include: {
            profileOne: true,
            profileTwo: true,
        },
    });

    if (!conversations || conversations.length === 0) {
        <p>Invite some friends to start chat.</p>;
    }

    return (
        <div
            className="flex flex-col h-full w-full 
            text-primary dark:bg-[#2B2D31] bg-[#F2F3F5]"
        >
            <Separator
                className="
                    bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"
            />
            <DefaultHeader />
            <p
                className="mt-4 ml-2 text-xs uppercase font-semibold text-zinc-500
                dark:text-zinc-400"
            >
                Direct messages
            </p>
            <Separator
                className="
                    bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"
            />
            <ScrollArea className="flex-1 px-3">
                <div>
                    {conversations.map((c) => {
                        const profileToShow = c.profileOneId === profile.id ? c.profileTwo : c.profileOne;
                        return <DefaultProfilesButton key={c.id} profile={profileToShow} />;
                    })}
                </div>
            </ScrollArea>
        </div>
    );
};
