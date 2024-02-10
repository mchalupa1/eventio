
import { Inter } from 'next/font/google';
import Head from 'next/head';

import { AuthContextProvider } from './Context/auth';
import './global.css';

const inter = Inter({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata= {
    title:  "Eventio",
    description: 'This is the Eventio page.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.className}>
            <Head>
                <link rel="icon" type="image/x-icon" href="./favicon.ico"></link>
            </Head>
            <body>
                <AuthContextProvider>{children}</AuthContextProvider>
            </body>
        </html>
    );
}
