'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';
import { useModal } from '@/hooks/useModalStore';

import qs from 'query-string';

import { ServerWithMembersWithProfiles } from '@/types';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuTrigger,
    DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserAvatar } from '@/components/UserAvatar';

import { MemberRole } from '@prisma/client';

const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-orange-500" />,
    ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-red-500" />,
};

export const MembersModal = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const [loadingId, setLoadingId] = useState('');

    const isModalOpen = isOpen && type === 'members';
    const { server } = data as { server: ServerWithMembersWithProfiles };

    const onRoleChange = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: { serverId: server?.id, memberId },
            });

            const response = await axios.patch(url, { role });

            router.refresh();
            onOpen('members', { server: response.data });
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId('');
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-zinc-700">Manage Members</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {server?.members?.length} members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map((m) => (
                        <div key={m.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={m.profile.imageUrl} />
                            <div className="flex flex-col gap-y-1">
                                <div
                                    className="text-xs font-semibold flex
                                    items-center gap-x-1"
                                >
                                    {m.profile.name.includes('null') ? m.profile.email : m.profile.name}
                                    {roleIconMap[m.role]}
                                </div>
                                <p className="text-xs text-zinc-500">{m.profile.email}</p>
                            </div>
                            {server.profileId !== m.profileId && loadingId !== m.id && (
                                <div className="ml-auto">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreVertical className="h-4 w-4 text-zinc-500" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="left">
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger className="flex items-center">
                                                    <ShieldQuestion className="w-4 h-4 mr-2" />
                                                    <span>Role</span>
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuItem onClick={() => onRoleChange(m.id, 'GUEST')}>
                                                            <Shield className="h-4 w-4 mr-2" />
                                                            Guest
                                                            {m.role === 'GUEST' && (
                                                                <Check className="w-4 h-4 ml-auto" />
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => onRoleChange(m.id, 'MODERATOR')}
                                                        >
                                                            <ShieldCheck className="h-4 w-4 mr-2" />
                                                            Moderator
                                                            {m.role === 'MODERATOR' && (
                                                                <Check className="w-4 h-4 ml-auto" />
                                                            )}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Gavel className="h-4 w-4 mr-2" />
                                                Kick
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )}
                            {loadingId === m.id && <Loader2 className="animate-spin text-zinc-500 w-4 h-4" />}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
