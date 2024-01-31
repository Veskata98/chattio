'use client';

import { useState } from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { useModal } from '@/hooks/useModalStore';

import { ServerWithMembersWithProfiles } from '@/types';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

import { UserAvatar } from '@/components/UserAvatar';

const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-orange-500" />,
    ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

export const MembersModal = () => {
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const [loadingId, setLoadingId] = useState('');

    const isModalOpen = isOpen && type === 'members';
    const { server } = data as { server: ServerWithMembersWithProfiles };

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
                    {server.members.map((m) => (
                        <div key={m.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={m.profile.imageUrl} />
                            <div className="flex flex-col gap-y-1">
                                <div
                                    className="text-xs font-semibold flex
                                    items-center gap-x-1"
                                >
                                    {m.profile.name}
                                    {roleIconMap[m.role]}
                                </div>
                                <p className="text-xs text-zinc-500">{m.profile.email}</p>
                            </div>
                            {server.profileId !== m.profileId && loadingId !== m.id && <div>Actions!</div>}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
