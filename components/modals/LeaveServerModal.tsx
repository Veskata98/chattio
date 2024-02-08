'use client';

import { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { useModal } from '@/hooks/useModalStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const LeaveServerModal = () => {
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const isModalOpen = isOpen && type === 'leaveServer';
    const { server } = data;

    const onConfirm = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/servers/${server?.id}/leave`);

            onClose();
            router.refresh();
            router.push('/');
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
                    <DialogTitle className="text-center text-zinc-700">Leave Server</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to leave{' '}
                        <span className="font-semibold text-orange-500">{server?.name}</span> ?
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
