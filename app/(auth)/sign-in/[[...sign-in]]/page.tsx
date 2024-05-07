import { dark } from '@clerk/themes';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <SignIn
            afterSignInUrl={'/'}
            afterSignUpUrl={'/'}
            appearance={{ baseTheme: dark, variables: { colorPrimary: '#f97316' } }}
        />
    );
}
