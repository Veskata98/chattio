import { redirect } from 'next/navigation';

import { db } from '@/lib/db';

import { InitialProfile } from '@/lib/initialProfile';
import { InitialModal } from '@/components/modals/InitialModal';

export default async function SetupPage() {
    const profile = await InitialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return <InitialModal />;
}
