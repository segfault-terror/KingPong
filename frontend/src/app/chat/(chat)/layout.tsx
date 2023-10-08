'use client';
import React, { useEffect, useState } from 'react';
import Header from '../../(dashboard)/Header';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import EmptyChat from '../EmptyChat';
import ChatSideBar from '../ChatSideBar';
import { DMList } from '../data/ChatData';

type ChatLayoutProps = {
    children: React.ReactNode;
};

export default function ChatLayout({ children }: ChatLayoutProps) {
    const matches = useMediaQuery('(min-width: 1024px)');
    const [isRendred, setIsRendred] = useState<boolean>(false);

    useEffect(() => {
        setIsRendred(true);
    }, []);

    if (!isRendred) {
        return null;
    }

    if (matches) {
        return (
            <div className="flex flex-col h-screen bg-background">
                <Header />
                <div className="flex items-center h-full">
                    <div className="py-8 px-4 h-full w-1/4">{children}</div>
                    <div className="flex-grow">
                        <EmptyChat toggle={false} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-background">
            <Header />
            <div className="py-8 px-4 flex-grow">{children}</div>
        </div>
    );
}
