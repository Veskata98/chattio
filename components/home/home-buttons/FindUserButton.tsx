'use client';

import { UserSearch } from 'lucide-react';

import { useModal } from '@/hooks/useModalStore';

export const FindUserButton = () => {
    const { onOpen } = useModal();

    return (
        <>
            <button
                onClick={() => onOpen('findUser')}
                className="text-zinc-500 hover:text-zinc-600
                dark:text-zinc-400 dark:hover:text-zinc-300
                transition w-full flex justify-center items-center gap-x-2 py-3 
                hover:bg-zinc-300 dark:hover:bg-zinc-700 font-semibold"
            >
                Find User
                <UserSearch className="w-4 h-4" />
            </button>
        </>
    );
};
