import React from 'react';
import Header from '../(dashboard)/Header';

type ChatLayoutProps = {
    children: React.ReactNode;
};

export default function ChatLayout({ children }: ChatLayoutProps) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="py-8 px-4 flex-grow">{children}</div>
        </div>
    );
}
