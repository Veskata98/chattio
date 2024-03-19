'use client';

import { Profile } from '@prisma/client';
import { UserAvatar } from '../UserAvatar';
import { cn } from '@/lib/utils';

import { useParams, useRouter } from 'next/navigation';
import { removeNotification } from '@/actions/removeNotification';

interface DefaultProfilesButtonProps {
    profile: Profile;
    conversationId: string;
    notification: boolean;
}

export const DefaultProfilesButton = ({ profile, conversationId, notification }: DefaultProfilesButtonProps) => {
    const params = useParams();
    const router = useRouter();

    const onClick = async () => {
        await removeNotification(conversationId);
        return router.push(`/conversations/${profile.id}`);
    };

    return (
        <button
            onClick={onClick}
            key={profile.id}
            className={cn(
                'group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zic-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
                params?.profileId === profile.id && 'bg-zinc-700/20 dark:bg-zink-700'
            )}
        >
            <UserAvatar src={profile.imageUrl} className="h-8 w-8 md:h-8 md:w-8" />
            {notification && <div className="w-2 h-2 rounded-full bg-red-500"></div>}
            <p
                className={cn(
                    'font-semibold text-sm text-zinc-500 group-hoverr:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
                    params?.profileId === profile.id && 'text-primary dark:text-zinc-200 dark:group-hover:text-white'
                )}
            >
                {profile.name}
            </p>
        </button>
    );
};
