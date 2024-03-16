'use client';

import { useState } from 'react';
import { useModal } from '@/hooks/useModalStore';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Profile } from '@prisma/client';
import axios from 'axios';
import { UserAvatar } from '../UserAvatar';

export const FindUserModal = () => {
    const [users, setUsers] = useState<Profile[]>([]);

    const { isOpen, onClose, type } = useModal();

    const router = useRouter();

    const isModalOpen = isOpen && type === 'findUser';

    const onChange = async (username: string) => {
        if (username === '' || !username) {
            setUsers([]);
            return;
        }

        const response = await axios.get(`/api/users?username=${username}`);
        setUsers(response.data);
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-zinc-700">Find User</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <div className="flex items-center mt-2">
                        <Input
                            className="bg-zinc-300/50 border-0
                                focus-visible:ring-0 focus-visible:ring-offset-0
                                text-black"
                            placeholder="Enter his/her username"
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </div>
                </div>
                <ul className="p-2 pt-0 pb-4">
                    {users.map((user) => (
                        <li key={user.id} className="mb-1">
                            <button
                                className="p-2 flex items-center gap-2 w-full bg-zinc-100 hover:bg-zinc-200 rounded-md"
                                onClick={() => {
                                    router.push(`/conversations/${user.id}`);
                                    onClose();
                                }}
                            >
                                <UserAvatar src={user.imageUrl} />
                                <span className="block text-sm text-gray-800">{user.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </DialogContent>
        </Dialog>
    );
};
