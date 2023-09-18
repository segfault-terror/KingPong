import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Jost, Mulish } from 'next/font/google';

const nicoMoji = localFont({
    src: [
        {
            path: '../../public/fonts/nico-moji.ttf',
            weight: '400',
        },
    ],
    variable: '--font-nicomoji',
});

const jost = Jost({
    variable: '--font-jost',
    subsets: ['latin'],
});

const mulish = Mulish({
    variable: '--font-mulish',
    subsets: ['latin'],
});

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
        <html
            lang="en"
            className={`${nicoMoji.variable} ${jost.variable} ${mulish.variable}`}
        >
            <body className="font-mulish">{children}</body>
        </html>
    );
}
