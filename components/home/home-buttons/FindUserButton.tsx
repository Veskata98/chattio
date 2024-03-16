'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { UserSearch } from 'lucide-react';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import axios from 'axios';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Profile } from '@prisma/client';
import { useModal } from '@/hooks/useModalStore';

interface FriendSearchButtonProps {
    data: {
        label: string;
        type: 'channel' | 'member';
        data:
            | {
                  icon: React.ReactNode;
                  name: string;
                  id: string;
              }[]
            | undefined;
    }[];
}

export const FindUserButton = () => {
    const { onOpen } = useModal();

    const [open, setOpen] = useState(false);
    const [data, setData] = useState<Profile[]>([]);
    const router = useRouter();
    const params = useParams();

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
