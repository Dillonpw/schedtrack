import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import { Providers } from './providers';

const fontHeading = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-heading',
});

const fontBody = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-body',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    'antialiased',
                    fontHeading.variable,
                    fontBody.variable
                )}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
