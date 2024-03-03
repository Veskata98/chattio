import { redirect } from 'next/navigation';

import { Hash, Mic, Crown, ShieldCheck, Video } from 'lucide-react';

import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { ChannelType, MemberRole } from '@prisma/client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import ServerHeader from './ServerHeader';
import { ServerSearch } from './ServerSearch';
import { ServerSection } from './ServerSection';
import { ServerChannel } from './ServerChannel';
import { ServerMember } from './ServerMember';

type ServerSidebarProps = {
    serverId: string;
};

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 w-4 h-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 w-4 h-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 w-4 h-4" />,
};

const roleIcoMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 w-4 h-4 text-orange-500" />,
    [MemberRole.ADMIN]: <Crown className="mr-2 w-4 h-4 text-yellow-500" />,
};

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
    const profile = await currentProfile();

    if (!profile) {
        redirect('/');
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
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                    <ServerSearch
                        data={[
                            {
                                label: 'Text Channels',
                                type: 'channel',
                                data: textChannels.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type],
                                })),
                            },
                            {
                                label: 'Voice Channels',
                                type: 'channel',
                                data: audioChannels.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type],
                                })),
                            },
                            {
                                label: 'Video Channels',
                                type: 'channel',
                                data: videoChannels.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type],
                                })),
                            },
                            {
                                label: 'Members',
                                type: 'member',
                                data: members.map((member) => ({
                                    id: member.id,
                                    name: member.profile.name,
                                    icon: roleIcoMap[member.role],
                                })),
                            },
                        ]}
                    />
                </div>
                <Separator
                    className="
                    bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"
                />
                {!!textChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            label="Text Channels"
                            sectionType="channels"
                            channelType={ChannelType.TEXT}
                            role={role}
                        />
                        <div className="space-y-[2px]">
                            {textChannels.map((channel) => {
                                return <ServerChannel key={channel.id} channel={channel} role={role} server={server} />;
                            })}
                        </div>
                    </div>
                )}
                {!!audioChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            label="Voice Channels"
                            sectionType="channels"
                            channelType={ChannelType.AUDIO}
                            role={role}
                        />
                        <div className="space-y-[2px]">
                            {audioChannels.map((channel) => {
                                return <ServerChannel key={channel.id} channel={channel} role={role} server={server} />;
                            })}
                        </div>
                    </div>
                )}
                {!!videoChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            label="Video Channels"
                            sectionType="channels"
                            channelType={ChannelType.VIDEO}
                            role={role}
                        />
                        <div className="space-y-[2px]">
                            {videoChannels.map((channel) => {
                                return <ServerChannel key={channel.id} channel={channel} role={role} server={server} />;
                            })}
                        </div>
                    </div>
                )}
                {!!members?.length && (
                    <div className="mb-2">
                        <ServerSection label="Members" sectionType="members" role={role} server={server} />

                        {members.map((member) => {
                            return <ServerMember key={member.id} member={member} server={server} />;
                        })}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};
