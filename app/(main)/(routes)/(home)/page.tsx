import { redirect } from 'next/navigation';

import { db } from '@/lib/db';

import { InitialProfile } from '@/lib/initialProfile';
import { InitialModal } from '@/components/modals/InitialModal';
import { DefaultSidebar } from '@/components/home/DefaultSidebar';
import { NavigationSidebar } from '@/components/navigation/NavigationSidebar';
import { HomeScreen } from '@/components/HomeScreen';

export default async function SetupPage() {
    const profile = await InitialProfile();

    // const server = await db.server.findFirst({
    //     where: {
    //         members: {
    //             some: {
    //                 profileId: profile.id,
    //             },
    //         },
    //     },
    // });

    // if (server) {
    //     return redirect(`/servers/${server.id}`);
    // }

    // return <InitialModal />;

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
