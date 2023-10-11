'use client';
import { createContext, useState } from 'react';
import Modal from './Modal';
import CreateNewChannel from './CreateNewChannel';
import JoinNewChannel, { Channel } from './JoinNewChannel';
import WelcomeChannel from './WelcomeChannel';

type ToggleProps = {
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
};

type ModalContextProps = {
    createChannel: boolean;
    joinChannel: boolean;
    setCreateChannel: (val: boolean) => void;
    setJoinChannel: (val: boolean) => void;
    welcomeChannel: boolean;
    setWelcomeChannel: (val: boolean) => void;
    setChannel: (channel: Channel) => void;
};

export const ModalContext = createContext({} as ModalContextProps);
export const ToggleContext = createContext<ToggleProps>({} as ToggleProps);

type MainChatLayoutProps = {
    children: React.ReactNode;
};

export default function MainChatLayout({ children }: MainChatLayoutProps) {
    const [toggle, setToggle] = useState<boolean>(false);
    const [createChannel, setCreateChannel] = useState(false);
    const [joinChannel, setJoinChannel] = useState(false);
    const [welcomeChannel, setWelcomeChannel] = useState(false);
    const [channel, setChannel] = useState<Channel>({} as Channel);

    return (
        <ToggleContext.Provider value={{ toggle, setToggle }}>
            <ModalContext.Provider
                value={{
                    createChannel,
                    setCreateChannel,
                    joinChannel,
                    setJoinChannel,
                    welcomeChannel,
                    setWelcomeChannel,
                    setChannel,
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
                {children}
            </ModalContext.Provider>
        </ToggleContext.Provider>
    );
}
