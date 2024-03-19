'use server';

import { redirectToSignIn } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';

export const removeNotification = async (conversationId: string) => {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return redirectToSignIn();
        }

        await db.directMessage.updateMany({
            where: {
                profileId: { not: profile.id },
                conversationId,
            },
            data: {
                is_seen: true,
            },
        });

        revalidatePath('/');
    } catch (error) {
        console.log('[REMOVE_NOTIFICATION]', error);
        return null;
    }
};
