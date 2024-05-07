import { dark } from '@clerk/themes';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
    return (
        <SignUp
            afterSignInUrl={'/'}
            afterSignUpUrl={'/'}
            appearance={{ baseTheme: dark, variables: { colorPrimary: '#f97316' } }}
        />
    );
}
