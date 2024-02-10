'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModalStore';

import axios from 'axios';
import qs from 'query-string';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const DeleteChannelModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { server, channel } = data;

    const isModalOpen = isOpen && type === 'deleteChannel';

    const onConfirm = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({ url: `/api/channels/${channel?.id}`, query: { serverId: server?.id } });

            await axios.delete(url);

            onClose();
            router.push(`/servers/${server?.id}`);
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-zinc-700">Delete Channel</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this?
                        <br />
                        <span className="font-semibold text-orange-500">#{channel?.name + ' '}</span>
                        will be delete permanently!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex justify-between items-center w-full">
                        <Button disabled={isLoading} variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button disabled={isLoading} variant="orange" onClick={onConfirm}>
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
