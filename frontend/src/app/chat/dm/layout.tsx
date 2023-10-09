'use client';
import Header from '@/app/(dashboard)/Header';
import ChatSideBar from '@/app/chat/ChatSideBar';
import { Channels, DMList } from '@/app/chat/data/ChatData';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import React, { useContext, useEffect, useState } from 'react';
import { ToggleContext } from '../layout';

export default function DMLayout({ children }: { children: React.ReactNode }) {
    const {toggle, setToggle} = useContext(ToggleContext);
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
                <div className="flex h-full gap-4 p-6">
                    <div className="w-1/4">
                        <ChatSideBar
                            messagesList={DMList}
                            channelList={Channels}
                            toggle={toggle}
                            setToggle={setToggle}
                        />
                    </div>
                    <div className="flex-grow">{children}</div>
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
