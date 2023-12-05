import { UserButton } from '@clerk/nextjs';

export default function Home() {
    return (
        <>
            <p className="text-orange-500 font-bold text-3xl">Discord clone</p>
            <UserButton afterSignOutUrl="/" />
        </>
    );
}
