import { redirectToSignIn } from '@clerk/nextjs';

import { currentProfile } from '@/lib/currentProfile';

import { HomeSidebar } from '@/components/home/HomeSidebar';

type ConversationLayoutProps = {
    children: React.ReactNode;
};

const ConversationLayout = async ({ children }: ConversationLayoutProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <HomeSidebar />
            </div>
            <main className="h-full md:pl-60">{children}</main>
        </div>
    );
};

export default ConversationLayout;
