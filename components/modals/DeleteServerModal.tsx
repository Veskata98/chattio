'use client';

import axios from 'axios';
import { useState } from 'react';
import { useModal } from '@/hooks/useModalStore';
import { useRouter } from 'next/navigation';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const DeleteServerModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const isModalOpen = isOpen && type === 'deleteServer';
    const { server } = data;

    const onConfirm = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/servers/${server?.id}`);

            onClose();
            router.push('/');
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
                    <DialogTitle className="text-center text-zinc-700">Delete Server</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this?
                        <br />
                        <span className="font-semibold text-orange-500">{server?.name + ' '}</span>
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
