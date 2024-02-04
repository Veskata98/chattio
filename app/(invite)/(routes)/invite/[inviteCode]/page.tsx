import { redirect } from 'next/navigation';
import { redirectToSignIn } from '@clerk/nextjs';

import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
    const { inviteCode } = params;
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    if (!inviteCode) {
        return redirect('/');
    }

    const existingServer = await db.server.findFirst({
        where: { members: { some: { profileId: profile.id } } },
    });

    if (existingServer && existingServer.inviteCode === inviteCode) {
        return redirect(`/servers/${existingServer.id}`);
    }

    const server = await db.server.update({
        where: {
            inviteCode,
        },
        data: {
            members: {
                create: { profileId: profile.id },
            },
        },
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return null;
};

export default InviteCodePage;
