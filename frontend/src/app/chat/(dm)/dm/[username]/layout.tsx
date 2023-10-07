'use client';
import ChatSideBar from '@/app/chat/ChatSideBar';
import { DMList } from '@/app/chat/data/ChatData';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import React, { useEffect, useState } from 'react';

export default function DMLayout({ children }: { children: React.ReactNode }) {
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
            <div>
                <ChatSideBar
                    messagesList={DMList}
                    channelList={[]}
                    toggle={false}
                    setToggle={(toggle) => toggle}
                />
                {children}
            </div>
        );
    }
    return { children };
}
