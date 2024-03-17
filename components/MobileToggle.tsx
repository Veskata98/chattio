import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import { NavigationSidebar } from '@/components/navigation/NavigationSidebar';
import { ServerSidebar } from '@/components/server/ServerSidebar';
import { DefaultSidebar } from '@/components/home/DefaultSidebar';

import { cn } from '@/lib/utils';

interface MobileToggleProps {
    serverId: string;
    className?: string;
}

export const MobileToggle = ({ serverId, className }: MobileToggleProps) => {
    return (
        <div className={cn(className)}>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0 flex gap-0 w-full">
                    <div className="w-[72px]">
                        <NavigationSidebar />
                    </div>
                    {serverId ? <ServerSidebar serverId={serverId} /> : <DefaultSidebar />}
                </SheetContent>
            </Sheet>
        </div>
    );
};
