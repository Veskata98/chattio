'use client';

import { useModal } from '@/hooks/useModalStore';

import { Plus } from 'lucide-react';

import { ActionTooltip } from '@/components/ActionTooltip';

export const NavigationAction = () => {
    const { onOpen } = useModal();

    return (
        <div>
            <ActionTooltip label="Add a server" side="right" align="center">
                <button onClick={() => onOpen('createServer')} className="group flex items-center">
                    <div
                        className="flex mx-3 h-[48px] w-[48px] rounded-[24px] 
                        group-hover:rounded-[16px] transition-all overflow-hidden 
                        items-center justify-center bg-zinc-100
                        dark:bg-neutral-700 group-hover:bg-emerald-500"
                    >
                        <Plus className="group-hover:text-white transition text-emerald-500" />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    );
};
