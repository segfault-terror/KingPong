'use client';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Header from '../../(dashboard)/Header';
import CreateNewChannel from '../CreateNewChannel';
import EmptyChat from '../EmptyChat';
import Modal from '../Modal';
import { ModalContext, ToggleContext } from '../layout';

type ChatLayoutProps = {
    children: React.ReactNode;
};

export default function ChatLayout({ children }: ChatLayoutProps) {
    const matches = useMediaQuery('(min-width: 1024px)');
    const [isRendred, setIsRendred] = useState<boolean>(false);
    const { toggle } = useContext(ToggleContext);
    const { createChannel, setCreateChannel } = useContext(ModalContext);

    useEffect(() => {
        setIsRendred(true);
    }, []);

    if (!isRendred) {
        return null;
    }

    if (matches) {
        return (
            <>
                {createChannel && (
                    <Modal
                        onClose={() => setCreateChannel(false)}
                        childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-2/3"
                    >
                        <CreateNewChannel />
                    </Modal>
                )}
                <div className="flex flex-col h-screen bg-background">
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
            {createChannel && (
                <Modal
                    onClose={() => setCreateChannel(false)}
                    childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%]"
                >
                    <CreateNewChannel />
                </Modal>
            )}
            <div className="flex flex-col h-screen bg-background">
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
