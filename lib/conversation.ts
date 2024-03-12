import { db } from '@/lib/db';

const findConversation = async (profileOneId: string, profileTwoId: string) => {
    try {
        return await db.conversation.findFirst({
            where: {
                AND: [{ profileOneId, profileTwoId }],
            },
            include: {
                profileOne: true,
                profileTwo: true,
            },
        });
    } catch (error) {
        return null;
    }
};

const createNewConversation = async (profileOneId: string, profileTwoId: string) => {
    try {
        return await db.conversation.create({
            data: {
                profileOneId,
                profileTwoId,
            },
            include: {
                profileOne: true,
                profileTwo: true,
            },
        });
    } catch (error) {
        return null;
    }
};

export const getOrCreateConversation = async (profileOneId: string, profileTwoId: string) => {
    let conversation =
        (await findConversation(profileOneId, profileTwoId)) || (await findConversation(profileTwoId, profileOneId));

    if (!conversation) {
        conversation = await createNewConversation(profileOneId, profileTwoId);
    }

    return conversation;
};
