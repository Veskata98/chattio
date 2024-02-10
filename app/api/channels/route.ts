import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { currentProfile } from '@/lib/currentProfile';

export const POST = async (req: Request) => {
    try {
        const profile = await currentProfile();

        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get('serverId');

        const { name, type } = await req.json();

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!serverId) {
            return new NextResponse('Server ID missing', { status: 400 });
        }

        if (typeof name === 'string' && name.toLowerCase() === 'general') {
            return new NextResponse("Name cannot be 'general'", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: { in: [MemberRole.ADMIN, MemberRole.MODERATOR] },
                    },
                },
            },
            data: {
                channels: {
                    create: {
                        profileId: profile.id,
                        name,
                        type,
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
};
