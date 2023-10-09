'use client';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../(dashboard)/Header';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import EmptyChat from '../EmptyChat';
import { ToggleContext } from '../layout';

type ChatLayoutProps = {
    children: React.ReactNode;
};

export default function ChatLayout({ children }: ChatLayoutProps) {
    const matches = useMediaQuery('(min-width: 1024px)');
    const [isRendred, setIsRendred] = useState<boolean>(false);
    const { toggle } = useContext(ToggleContext);

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
                <div className="flex items-center gap-4 h-full p-6">
                    <div className="h-full w-1/4">{children}</div>
                    <div className="flex-grow">
                        <EmptyChat toggle={toggle} />
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
