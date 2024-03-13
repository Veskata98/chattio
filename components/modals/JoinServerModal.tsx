'use client';

import { useState } from 'react';
import { useModal } from '@/hooks/useModalStore';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const JoinServerModal = () => {
    const [link, setLink] = useState('');
    const { isOpen, onClose, type } = useModal();

    const router = useRouter();

    const isModalOpen = isOpen && type === 'joinServer';

    const onClick = () => {
        onClose();
        router.push(link);
        return router.refresh();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-zinc-700">Join Server</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label
                        className="uppercase text-xs font-bold
                            text-zinc-500 dark:text-secondary/70"
                    >
                        Server invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            className="bg-zinc-300/50 border-0
                                focus-visible:ring-0 focus-visible:ring-offset-0
                                text-black"
                            placeholder="Enter invite URL"
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            onClick={onClick}
                            disabled={link === ''}
                            variant="orange"
                            size="lg"
                            className="text-zinc-200 mt-4"
                        >
                            Join
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
