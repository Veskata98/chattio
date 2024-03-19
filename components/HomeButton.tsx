'use client';

import { Bot } from 'lucide-react';

import { ActionTooltip } from '@/components/ActionTooltip';
import { useRouter } from 'next/navigation';

export const HomeButton = () => {
    const router = useRouter();

    const onClick = () => {
        return router.push('/');
    };

    return (
        <div>
            <ActionTooltip label="Home" side="right" align="center">
                <button onClick={onClick} className="group flex items-center">
                    <div
                        className="flex mx-3 h-[48px] w-[48px] rounded-[24px] 
                        group-hover:rounded-[16px] transition-all overflow-hidden 
                        items-center justify-center bg-zinc-100
                        dark:bg-neutral-700 group-hover:bg-zinc-500"
                    >
                        <Bot className="group-hover:text-white transition text-zinc-500" />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    );
};
