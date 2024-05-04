import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
    publicRoutes: ['/api/webhooks(.*)', '/api/uploadthing'],
    signInUrl: '/sign-in',
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
