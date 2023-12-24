'use client';

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { ActionTooltip } from '@/components/ActionTooltip';

interface NavigationItemProps {
    id: string;
    name: string;
    imageUrl: string;
}

export const NavitagationItem = ({ id, name, imageUrl }: NavigationItemProps) => {
    const router = useRouter();
    const params = useParams();

    const clickHandler = () => {
        router.push(`/servers/${id}`);
    };

    return (
        <ActionTooltip label={name} side="right" align="center">
            <button onClick={clickHandler} className="group relative flex items-center">
                <div
                    className={cn(
                        'absolute left-0 bg-primary rounded-r-full transition-all w-[4px]',
                        params?.serverId !== id && 'group-hover:h-[20px]',
                        params?.serverId === id ? 'h-[36px]' : 'h-[8px]'
                    )}
                />
                <div
                    className={cn(
                        'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
                        params?.serverId === id && 'bg-primary/10 text-primary rounded-[16px]'
                    )}
                >
                    <Image src={imageUrl} alt="Channel" width={48} height={48} />
                </div>
            </button>
        </ActionTooltip>
    );
};
