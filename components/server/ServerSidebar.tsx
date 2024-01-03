import { redirect } from 'next/navigation';

import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { ChannelType } from '@prisma/client';

import ServerHeader from '@/components/server/ServerHeader';

type ServerSidebarProps = {
    serverId: string;
};

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect('/');
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: 'asc',
                },
            },
        },
    });

    if (!server) {
        return redirect('/');
    }

    const textChannels = server?.channels.filter((c) => c.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((c) => c.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((c) => c.type === ChannelType.VIDEO);

    const members = server?.members.filter((m) => m.profileId !== profile.id);

    const role = server.members.find((m) => m.profileId === profile.id)?.role;

    return (
        <div
            className="flex flex-col h-full w-full 
            text-primary dark:bg-[#2B2D31] bg-[#F2F3F5]"
        >
            <ServerHeader server={server} role={role} />
        </div>
    );
};
