import { useModal } from '@/hooks/useModalStore';
import { Users } from 'lucide-react';

export const FriendRequestButton = () => {
    const { onOpen } = useModal();

    return (
        <button
            onClick={() => onOpen('joinServer')}
            className="text-zinc-500 hover:text-zinc-600
                dark:text-zinc-400 dark:hover:text-zinc-300
                transition w-full flex justify-center items-center gap-x-2 py-3 
                hover:bg-zinc-300 dark:hover:bg-zinc-700"
        >
            Friend Requests
            <Users className="w-4 h-4" />
        </button>
    );
};
