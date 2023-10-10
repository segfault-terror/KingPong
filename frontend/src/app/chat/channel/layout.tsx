'use client';
import Header from '@/app/(dashboard)/Header';
import ChatSideBar from '@/app/chat/ChatSideBar';
import { Channels, DMList } from '@/app/chat/data/ChatData';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import React, { useContext, useEffect, useState } from 'react';
import { ModalContext, ToggleContext } from '../layout';
import Modal from '../Modal';
import CreateNewChannel from '../CreateNewChannel';

export default function DMLayout({ children }: { children: React.ReactNode }) {
    const { toggle, setToggle } = useContext(ToggleContext);
    const matches = useMediaQuery('(min-width: 1024px)');
    const [isRendred, setIsRendred] = useState<boolean>(false);
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
                <div className="flex flex-col bg-background h-screen">
                    <Header />
                    <div
                        className="flex-grow flex gap-4 p-6 h-[90%]
                            mt-[120px] lg:mt-[110px]"
                    >
                        <div className="w-1/4">
                            <ChatSideBar
                                messagesList={DMList}
                                channelList={Channels}
                                toggle={toggle}
                                setToggle={setToggle}
                            />
                        </div>
                        <div className="flex-grow w-3/4">{children}</div>
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
            <div className="flex flex-col bg-background h-screen">
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
