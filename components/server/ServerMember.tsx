'use client';

import { useParams, useRouter } from 'next/navigation';

import { Crown, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Member, MemberRole, Profile, Server } from '@prisma/client';
import { UserAvatar } from '@/components/UserAvatar';

interface ServerMemberProps {
    member: Member & { profile: Profile };
    server: Server;
    disabled: boolean;
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 ml-2 text-orange-500" />,
    [MemberRole.ADMIN]: <Crown className="h-4 w-4 ml-2 text-yellow-500" />,
};

export const ServerMember = ({ member, server, disabled }: ServerMemberProps) => {
    const router = useRouter();
    const params = useParams();

    const icon = roleIconMap[member.role];

    const onClick = () => {
        return router.push(`/conversations/${member.profileId}`);
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                'group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zic-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
                params?.memberId === member.id && 'bg-zinc-700/20 dark:bg-zinc-700'
            )}
        >
            <UserAvatar src={member.profile.imageUrl} className="h-8 w-8 md:h-8 md:w-8" />
            <p
                className={cn(
                    'font-semibold text-sm text-zinc-500 group-hoverr:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
                    params?.memberId === member.id && 'text-primary dark:text-zinc-200 dark:group-hover:text-white'
                )}
            >
                {member.profile.name}
            </p>
            {icon}
        </button>
    );
};
