import { redirect } from 'next/navigation';

import { UserButton } from '@clerk/nextjs';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import { ModeToggle } from '@/components/ModeToggle';

import { NavigationAction } from '@/components/navigation/NavigationAction';
import { NavigationItem } from '@/components/navigation/NavigationItem';

import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { HomeButton } from './HomeButton';

export const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect('/');
    }

    const servers = await db.server.findMany({
        where: { members: { some: { profileId: profile.id } } },
    });

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
            <HomeButton />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
                    </div>
                ))}
            </ScrollArea>
            <Separator className="h-[2px] rounded-md bg-zinc-300 w-10 dark:bg-zinc-700 mx-auto" />
            <NavigationAction />
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: 'h-[48px] w-[48px]' } }} />
            </div>
        </div>
    );
};
