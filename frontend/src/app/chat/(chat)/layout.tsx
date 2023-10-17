'use client';
import { toggleContext } from '@/contexts/contexts';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../(dashboard)/Header';
import EmptyChat from '../EmptyChat';

type ChatLayoutProps = {
    children: React.ReactNode;
};

export default function ChatLayout({ children }: ChatLayoutProps) {
    const matches = useMediaQuery('(min-width: 1024px)');
    const [isRendred, setIsRendred] = useState<boolean>(false);
    const { toggle } = useContext(toggleContext);

    useEffect(() => {
        setIsRendred(true);
    }, []);

    if (!isRendred) {
        return null;
    }

    if (matches) {
        return (
            <>
                <div className="flex flex-col min-h-screen bg-background">
                    <Header />
                    <div
                        className="flex items-center gap-4 p-6 h-[90vh]
                            mt-[110px]"
                    >
                        <div className="h-full w-1/4">{children}</div>
                        <div className="flex-grow">
                            <EmptyChat toggle={toggle} />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col min-h-screen bg-background">
                <Header />
                <div
                    className="flex py-8 px-4 h-[85vh]
                        mt-[120px]"
                >
                    <div className="flex-grow">{children}</div>
                </div>
            </div>
        </>
    );
}
