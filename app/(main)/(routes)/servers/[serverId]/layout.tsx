import { ServerSidebar } from '@/components/server/ServerSidebar';

type ServerIdLayoutProps = {
    children: React.ReactNode;
    params: { serverId: string };
};

const ServerIdLayout = async ({ children, params }: ServerIdLayoutProps) => {
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="h-full md:pl-60">{children}</main>
        </div>
    );
};

export default ServerIdLayout;
