import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Jost, Mulish, Jockey_One } from 'next/font/google';

import { Suspense } from 'react';
import Loading from '@/components/Loading';

const nicoMoji = localFont({
    src: [
        {
            path: '../../public/fonts/nico-moji.ttf',
            weight: '400',
        },
    ],
    variable: '--font-nicomoji',
});

const jockeyOne = Jockey_One({
    variable: '--font-jockey-one',
    subsets: ['latin'],
    weight: '400',
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
            className={`${nicoMoji.variable} ${jost.variable} ${mulish.variable} ${jockeyOne.variable}`}
        >
            <Suspense fallback={<Loading />} />
            <body className="font-mulish bg-default bg-fixed bg-cover text-white">
                {children}
            </body>
        </html>
    );
}
