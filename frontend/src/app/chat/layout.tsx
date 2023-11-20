'use client';
import { modalContext, toggleContext } from '@/contexts/contexts';
import { useState } from 'react';
import Modal from '../../components/Modal';
import CreateNewChannel from './CreateNewChannel';
import JoinNewChannel from './JoinNewChannel';
import NewConversation from './NewConversation';
import WelcomeChannel from './WelcomeChannel';
import Loading from '../loading';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { SocketProvider } from '@/contexts/SocketContext';
import { redirect } from 'next/navigation';

type MainChatLayoutProps = {
    children: React.ReactNode;
};

export default function MainChatLayout({ children }: MainChatLayoutProps) {
    const [toggle, setToggle] = useState<boolean>(false);
    const [createChannel, setCreateChannel] = useState(false);
    const [joinChannel, setJoinChannel] = useState(false);
    const [welcomeChannel, setWelcomeChannel] = useState(false);
    const [channel, setChannel] = useState({} as any);
    const [newConversation, setNewConversation] = useState(false);
    const [dotsDropdown, setDotsDropdown] = useState(false);

    const { error, data } = useQuery({
        queryKey: ['auth'],
        queryFn: async () => {
            try {
                return await axios.get(`/api/auth/status`, {
                    withCredentials: true,
                });
            } catch {
                redirect('/signin');
            }
        },
    });
    if (error || data?.data.status === false) {
        redirect('/signin');
    }

    const { data: me, isLoading } = useQuery({
        queryKey: ['user', 'me'],
        queryFn: async () => {
            const { data: me } = await axios.get('/api/user/me', {
                withCredentials: true,
            });
            return me;
        },
    });

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

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
                <SocketProvider username={me.username} namespace="chat">
                    {createChannel && (
                        <Modal
                            onClose={() => setCreateChannel(false)}
                            childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl border-r border-l border-secondary-500 w-[90%]
                                        lg:w-2/3 max-w-[600px]"
                        >
                            <CreateNewChannel />
                        </Modal>
                    )}
                    {joinChannel && (
                        <Modal
                            onClose={() => setJoinChannel(false)}
                            childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl border-r border-l border-secondary-500 w-[90%] h-[300px]
                                        lg:w-2/3 max-w-[600px]"
                        >
                            <JoinNewChannel />
                        </Modal>
                    )}
                    {welcomeChannel && (
                        <Modal
                            onClose={() => setWelcomeChannel(false)}
                            childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl border-r border-l border-secondary-500 w-[90%] h-[300px]
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
                            childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl border-r border-l border-secondary-500 w-[90%] h-[300px]
                                        lg:w-2/3 max-w-[600px]"
                        >
                            <NewConversation />
                        </Modal>
                    )}
                    {children}
                </SocketProvider>
            </modalContext.Provider>
        </toggleContext.Provider>
    );
}
