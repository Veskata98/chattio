import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        const username = searchParams.get('username');

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!username) {
            return new NextResponse('Username missing', { status: 400 });
        }

        const users = await db.profile.findMany({
            where: {
                name: {
                    startsWith: username,
                    not: {
                        equals: profile.name,
                    },
                },
            },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.log('[MESSAGES_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
