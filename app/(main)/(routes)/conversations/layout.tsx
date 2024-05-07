import { redirectToSignIn } from '@clerk/nextjs';

import { currentProfile } from '@/lib/currentProfile';

import { DefaultSidebar } from '@/components/home/DefaultSidebar';

type ConversationLayoutProps = {
    children: React.ReactNode;
};

const ConversationLayout = async ({ children }: ConversationLayoutProps) => {
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <DefaultSidebar />
            </div>
            <main className="h-full md:pl-60">{children}</main>
        </div>
    );
};

export default ConversationLayout;
