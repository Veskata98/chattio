import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';
import { cn } from '@/lib/utils';

import { ClerkProvider } from '@clerk/nextjs';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ModalProvider } from '@/components/providers/ModalProvider';
import { SocketProvider } from '@/components/providers/SocketProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';

const font = Roboto({ weight: '500', style: 'normal', subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Chatt.io',
    description: 'Your new chat adventure',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={cn(font.className, 'bg-white dark:bg-[#323232]')}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={false}
                        storageKey="discord-theme"
                    >
                        <SocketProvider>
                            <ModalProvider />
                            <QueryProvider>{children}</QueryProvider>
                        </SocketProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
