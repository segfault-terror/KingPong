'use client';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../(dashboard)/Header';
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
            <>
                <div className="flex flex-col h-screen bg-background overflow-auto">
                    <Header />
                    <div
                        className="flex items-center gap-4 p-6 h-[90%]
                            mt-[120px] lg:mt-[110px]"
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
            <div className="flex flex-col h-screen bg-background overflow-auto">
                <Header />
                <div
                    className="py-8 px-4 flex-grow h-[85%]
                        mt-[120px] lg:mt-[110px]"
                >
                    {children}
                </div>
            </div>
        </>
    );
}
