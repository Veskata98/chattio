import { currentUser, redirectToSignIn } from '@clerk/nextjs';

import { db } from '@/lib/db';

export const currentProfile = async () => {
    const user = await currentUser();

    let displayName = '';

    if (!user) {
        return redirectToSignIn();
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: user.id,
        },
    });

    if (profile) {
        return profile;
    }

    if (user.username) {
        displayName = user.username;
    } else {
        displayName = `${user.firstName} ${user.lastName}`;
    }

    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: displayName,
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl,
        },
    });

    return newProfile;
};
