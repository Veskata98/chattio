import { dark } from '@clerk/themes';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
    return (
        <SignUp
            afterSignUpUrl={'/'}
            signInUrl="/sign-in"
            appearance={{ baseTheme: dark, variables: { colorPrimary: '#f97316' } }}
        />
    );
}
