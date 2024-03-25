const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full flex items-center justify-center flex-col text-white">
            <p className="text-center text-2xl font-semibold mb-2">Welcome to Chatt.io!</p>
            <p className="text-center mb-4">
                Greetings! We&apos;re thrilled to have you here. Please log in to start chatting.
            </p>
            {children}
        </div>
    );
};

export default AuthLayout;
