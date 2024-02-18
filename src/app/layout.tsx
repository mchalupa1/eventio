
import { Inter } from 'next/font/google';
import { AuthContextProvider } from './Context/auth';
import './global.css';
import { Metadata } from 'next';

const inter = Inter({
    weight: ['400', '700'],
    subsets: ['latin'],
    display:"optional",
});

export const metadata:Metadata = {
    title: 'Eventio',
    description: 'This is Eventio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.className}>
            <body>
                <AuthContextProvider>{children}</AuthContextProvider>
            </body>
        </html>
    );
}
