'use client';

import { useModal } from '@/hooks/useModalStore';
import { Server } from 'lucide-react';

export const JoinServerButton = () => {
    const { onOpen } = useModal();

    return (
        <button
            onClick={() => onOpen('joinServer')}
            className="text-zinc-500 hover:text-zinc-600
                dark:text-zinc-400 dark:hover:text-zinc-300
                transition w-full flex justify-center items-center gap-x-2 py-3
                bg-zinc-300 dark:bg-zinc-700
                hover:bg-zinc-400 dark:hover:bg-zinc-600 font-semibold"
        >
            Join Server
            <Server className="w-4 h-4" />
        </button>
    );
};
