'use client';

import { useModal } from '@/hooks/useModalStore';
import { Server } from 'lucide-react';

export const JoinServerButton = () => {
    const { onOpen } = useModal();

    return (
        <button
            onClick={() => onOpen('joinServer')}
            className="text-zinc-900 hover:text-zinc-700
                transition w-full flex justify-center items-center 
                gap-x-2 py-3 bg-orange-400 font-semibold"
        >
            Join Server
            <Server className="w-4 h-4" />
        </button>
    );
};
