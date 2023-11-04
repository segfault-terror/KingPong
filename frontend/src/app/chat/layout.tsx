'use client';
import { useEffect, useState } from 'react';
import CreateNewChannel from './CreateNewChannel';
import JoinNewChannel, { Channel } from './JoinNewChannel';
import WelcomeChannel from './WelcomeChannel';
import NewConversation from './NewConversation';
import Modal from '../../components/Modal';
import DropdownModal from './DropdownModal';
import ChatMenu from './ChatMenu';
import { modalContext, toggleContext } from '@/contexts/contexts';
import { io } from 'socket.io-client';

type MainChatLayoutProps = {
    children: React.ReactNode;
};

export default function MainChatLayout({ children }: MainChatLayoutProps) {
    const [toggle, setToggle] = useState<boolean>(false);
    const [createChannel, setCreateChannel] = useState(false);
    const [joinChannel, setJoinChannel] = useState(false);
    const [welcomeChannel, setWelcomeChannel] = useState(false);
    const [channel, setChannel] = useState<Channel>({} as Channel);
    const [newConversation, setNewConversation] = useState(false);
    const [dotsDropdown, setDotsDropdown] = useState(false);


    return (
        <toggleContext.Provider value={{ toggle, setToggle }}>
            <modalContext.Provider
                value={{
                    createChannel,
                    setCreateChannel,
                    joinChannel,
                    setJoinChannel,
                    welcomeChannel,
                    setWelcomeChannel,
                    setChannel,
                    newConversation,
                    setNewConversation,
                    dotsDropdown,
                    setDotsDropdown,
                }}
            >
                {createChannel && (
                    <Modal
                        onClose={() => setCreateChannel(false)}
                        childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%]
                                        lg:w-2/3 max-w-[600px]"
                    >
                        <CreateNewChannel />
                    </Modal>
                )}
                {joinChannel && (
                    <Modal
                        onClose={() => setJoinChannel(false)}
                        childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%] h-[300px]
                                        lg:w-2/3 max-w-[600px]"
                    >
                        <JoinNewChannel />
                    </Modal>
                )}
                {welcomeChannel && (
                    <Modal
                        onClose={() => setWelcomeChannel(false)}
                        childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%] h-[300px]
                                            lg:w-2/3 max-w-[600px]"
                    >
                        <WelcomeChannel
                            channelName={channel.name}
                            channelVisibility={channel.visibility}
                            setWelcomeChannel={setWelcomeChannel}
                            setJoinChannel={setJoinChannel}
                        />
                    </Modal>
                )}
                {newConversation && (
                    <Modal
                        onClose={() => setNewConversation(false)}
                        childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%] h-[300px]
                                        lg:w-2/3 max-w-[600px]"
                    >
                        <NewConversation />
                    </Modal>
                )}
                {dotsDropdown && (
                    <DropdownModal
                        onClose={() => setDotsDropdown(false)}
                        childrenClassName="top-[246px] md:top-[200px] lg:top-[192px] right-16"
                    >
                        <ChatMenu />
                    </DropdownModal>
                )}
                {children}
            </modalContext.Provider>
        </toggleContext.Provider>
    );
}
