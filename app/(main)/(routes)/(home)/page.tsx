import { DefaultSidebar } from '@/components/home/DefaultSidebar';
import { HomeScreen } from '@/components/HomeScreen';

export default async function SetupPage() {
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <DefaultSidebar />
            </div>
            <div className="h-full md:pl-60">
                <HomeScreen />
            </div>
        </div>
    );
}
