import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local'

const nicoMoji = localFont({
    src: [
        {
            path: '../../public/fonts/nico-moji.ttf',
            weight: '400',
        },
    ],
    variable: '--font-nicomoji',
})

export const metadata: Metadata = {
    title: 'KingPong',
    description: 'KingPong is a game of skill and luck',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${nicoMoji.variable}`}>
            <body>{children}</body>
        </html>
    );
}
