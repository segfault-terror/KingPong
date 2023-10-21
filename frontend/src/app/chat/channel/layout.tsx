'use client';
import Header from '@/app/(dashboard)/Header';
import ChatSideBar from '@/app/chat/ChatSideBar';
import { toggleContext } from '@/contexts/contexts';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePathname } from 'next/navigation';
import path from 'path';
import React, { useContext, useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import ChannelSideBar from '../ChannelSideBar';
import Modal from '../Modal';
import { channelModalContext } from '@/contexts/contexts';

export default function DMLayout({ children }: { children: React.ReactNode }) {
    const { toggle, setToggle } = useContext(toggleContext);
    const matches = useMediaQuery('(min-width: 1024px)');
    const [isRendred, setIsRendred] = useState<boolean>(false);
    const [showMembers, setShowMembers] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsRendred(true);
    }, []);

    if (!isRendred) {
        return null;
    }

    if (matches) {
        return (
            <>
                <div className="flex flex-col bg-background min-h-screen">
                    <Header />
                    <div
                        className="flex gap-4 p-6 h-[90vh]"
                    >
                        <div className="w-1/4">
                            <ChatSideBar
                                toggle={toggle}
                                setToggle={setToggle}
                            />
                        </div>
                        <channelModalContext.Provider
                            value={{ showMembers, setShowMembers }}
                        >
                            <div className="w-3/4">{children}</div>
                        </channelModalContext.Provider>
                        {showMembers && (
                            <div className="w-1/4 max-w-[250px]">
                                <ChannelSideBar
                                    channelName={path.basename(pathname)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            {showMembers && (
                <Modal
                    onClose={() => setShowMembers(false)}
                    childrenClassName="h-[80vh] w-[70vw]"
                >
                    <button
                    title='Close'
                    type='button'
                        className="fixed -top-10 left-1/2"
                        onClick={() => setShowMembers(false)}
                    >
                        <AiFillCloseCircle className="text-4xl text-red-400" />
                    </button>
                    <ChannelSideBar channelName={path.basename(pathname)} />
                </Modal>
            )}
            <div className="flex flex-col bg-background min-h-screen">
                <Header />
                <div
                    className="flex py-8 px-4 h-[90vh]"
                >
                    <channelModalContext.Provider
                        value={{ showMembers, setShowMembers }}
                    >
                        <div className="flex-grow">{children}</div>
                    </channelModalContext.Provider>
                </div>
            </div>
        </>
    );
}
