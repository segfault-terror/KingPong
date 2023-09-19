import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'KingPong - Sign Up',
    description: 'KingPong is a game of skill and luck',
};

export default function SignUpLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return <>{children}</>;
}
