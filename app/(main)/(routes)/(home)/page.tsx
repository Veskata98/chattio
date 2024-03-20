import { DefaultSidebar } from '@/components/home/DefaultSidebar';
import { HomeScreen } from '@/components/HomeScreen';
import { MobileToggle } from '@/components/MobileToggle';

export default async function SetupPage() {
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <DefaultSidebar />
            </div>
            <div>
                <MobileToggle serverId="" className="ml-auto md:hidden absolute right-2 top-2" />
            </div>
            <div className="h-full md:pl-60">
                <HomeScreen />
            </div>
        </div>
    );
}
