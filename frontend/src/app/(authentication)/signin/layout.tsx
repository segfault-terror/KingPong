import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'KingPong - Sign In',
    description: 'KingPong is a game of skill and luck',
};

export default function SignInLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return <>{children}</>;
}
