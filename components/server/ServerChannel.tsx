'use client';

import { Channel, ChannelType, MemberRole } from '@prisma/client';
import { Hash, Mic, Video } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface ServerChannelProps {
    channel: Channel;
    role?: MemberRole;
}

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
};

export const ServerChannel = ({ channel }: ServerChannelProps) => {
    const Icon = iconMap[channel.type];
    const router = useRouter();
    const params = useParams();

    const onClick = () => {
        return router.push(`/servers/${params?.serverId}/conversations/${channel.id}`);
    };

    return (
        <button
            onClick={onClick}
            className="py-1 flex gap-x-2 text-zinc-200 items-center w-full hover:bg-zinc-700 rounded-md"
        >
            <Icon className="w-4 h-4" />
            <p>{channel.name}</p>
        </button>
    );
};
