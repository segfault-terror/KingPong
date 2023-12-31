'use client';
import { useSocket } from '@/contexts/SocketContext';
import { channelModalContext, modalContext } from '@/contexts/contexts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import {
    FaGlobeAfrica,
    FaLock,
    FaShieldAlt,
    FaUserFriends,
} from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { MdGroupAdd } from 'react-icons/md';
import Loading from '../loading';
import ChatInput from './ChatInput';
import ChatMenu from './ChatMenu';
import DropdownModal from './DropdownModal';
import InviteModal from './components/InviteModal';
import ExitMessageDialog from './components/KickMessageDialog';

type ChannelConversationProps = {
    channelName: string;
};

export function ChannelTypeIcon(props: {
    channelType: 'PUBLIC' | 'PRIVATE' | 'PROTECTED';
}) {
    switch (props.channelType) {
        case 'PUBLIC':
            return <FaGlobeAfrica className="w-4 h-4" title="Public Channel" />;
        case 'PRIVATE':
            return <FaLock className="w-4 h-4" title="Private Channel" />;
        case 'PROTECTED':
            return (
                <FaShieldAlt className="w-4 h-4" title="Protected Channel" />
            );
    }
}

export default function ChannelConversation(props: ChannelConversationProps) {
    const { dotsDropdown, setDotsDropdown } = useContext(modalContext);
    const { showMembers, setShowMembers } = useContext(channelModalContext);
    const [isTyping, setIsTyping] = useState(false);
    const [typingUsername, setTypingUsername] = useState('');

    const { socket } = useSocket();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['channel', props.channelName],
        queryFn: async () => {
            const { data: channel } = await axios.get(
                `/api/chat/channel/${props.channelName}`,
                { withCredentials: true },
            );
            return channel;
        },
    });

    const { data: me, isLoading: isLoadingMe } = useQuery({
        queryKey: ['user', 'me'],
        queryFn: async () => {
            const { data: me } = await axios.get('/api/user/me', {
                withCredentials: true,
            });
            return me;
        },
    });

    const queryClient = useQueryClient();
    const { mutate: sendMessage } = useMutation({
        mutationFn: async (content: string) => {
            return await axios.post('/api/chat/channel/message', {
                withCredentials: true,
                channelName: props.channelName,
                sender: me?.username,
                content,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['channel', props.channelName], {
                exact: true,
            });
            queryClient.invalidateQueries(['channels', 'brief'], {
                exact: true,
            });
            socket?.emit('new-channel-message', props.channelName);
        },
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [data]);

    const [exitChannel, setExitChannel] = useState(false);
    const [exitReason, setExitReason] = useState<
        'kick' | 'ban' | 'delete' | null
    >(null);

    const [newChannelName, setNewChannelName] = useState('');
    useEffect(() => {
        if (!newChannelName) return;
        redirect(`/chat/channel/${newChannelName}`);
    }, [newChannelName]);

    useEffect(() => {
        socket?.on(
            'redirect-to-chat',
            (data: { channel: string; reason: 'kick' | 'ban' }) => {
                if (data.channel === props.channelName) {
                    setExitChannel(true);
                    setExitReason(data.reason);
                }
            },
        );
        socket?.on('channel-deleted', (channelName: string) => {
            if (channelName === props.channelName) {
                setExitChannel(true);
                setExitReason('delete');
            }
        });
        socket?.on('update-channel-sidebar', (channelName: string) => {
            queryClient.invalidateQueries(['channel', channelName], {
                exact: true,
            });
            queryClient.invalidateQueries(['channels', 'brief'], {
                exact: true,
            });
        });
        socket?.on('channel-edited', (data: any) => {
            queryClient.invalidateQueries(['channels', 'brief'], {
                exact: true,
            });
            setNewChannelName(data.newName);
            socket?.emit('change-room', {
                oldRoom: data.oldName,
                newRoom: data.newName,
            });
        });
        return () => {
            socket?.off('redirect-to-chat');
            socket?.off('channel-deleted');
            socket?.off('update-channel-sidebar');
            socket?.off('channel-edited');
        };
    });

    const [inviteModal, setInviteModal] = useState(false);

    if (isLoading || isLoadingMe) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    if (isError) {
        redirect('/not-found');
    }

    const isOwner = data.owner.username === me.username;
    const isAdmin = data.admins.some(
        (admin: any) => admin.username === me.username,
    );

    return (
        <div
            className="flex flex-col items-stretch h-full w-full
                bg-primary
                rounded-2xl
                px-4 py-3
                border-secondary-200 border-[1px] relative"
        >
            <div className="absolute inset-0 bg-chatBg rounded-2xl opacity-5 z-0" />
            <div
                className="flex justify-between items-center
                            p-4 rounded-lg z-20
                            bg-gradient-to-b from-background/60 to-[#330E51]/60"
            >
                <h1 className="text-cube_palette-200 text-2xl flex flex-row items-center gap-2">
                    <ChannelTypeIcon channelType={data?.type} />
                    <span>{data?.name}</span>
                </h1>
                {isTyping && (
                    <p className="text-secondary-500 text-xs">
                        {' '}
                        {typingUsername} is typing...{' '}
                    </p>
                )}
                <div className="flex gap-4 text-secondary-200">
                    {data.type === 'PRIVATE' && (isOwner || isAdmin) && (
                        <button
                            onClick={() => {
                                setInviteModal(true);
                            }}
                        >
                            <MdGroupAdd className="w-8 h-8 text-secondary-500" />
                        </button>
                    )}
                    {inviteModal && (
                        <InviteModal
                            inviteCode={data.inviteCode}
                            onClose={() => setInviteModal(false)}
                        />
                    )}
                    <button onClick={() => setShowMembers(!showMembers)}>
                        <FaUserFriends className="w-8 h-8" />
                    </button>
                    <button
                        className="text-secondary-200"
                        onClick={() => setDotsDropdown(true)}
                    >
                        <HiDotsVertical className="w-8 h-8" />
                    </button>
                    {dotsDropdown && (
                        <DropdownModal
                            onClose={() => setDotsDropdown(false)}
                            childrenClassName={
                                showMembers
                                    ? 'top-[246px] md:top-[200px] lg:top-[192px] right-[340px]'
                                    : 'top-[246px] md:top-[200px] lg:top-[192px] right-16'
                            }
                        >
                            <ChatMenu />
                        </DropdownModal>
                    )}
                    {exitChannel && (
                        <ExitMessageDialog
                            channelName={props.channelName}
                            reason={exitReason!}
                        />
                    )}
                </div>
            </div>

            <div className="flex-grow overflow-y-scroll scrollbar-none pb-2 z-20">
                <ul className="flex flex-col gap-8 p-6">
                    {data?.messages.length === 0 && (
                        <div className="text-cube_palette-200 font-jost font-light text-center">
                            Send a message to start a conversation
                        </div>
                    )}

                    {data?.messages.length !== 0 &&
                        data?.messages.map((message: any) => (
                            <ChannelMessage
                                avatar={message.sender.avatar}
                                key={message.id}
                                text={message.content}
                                isMe={message.sender.username === me?.username}
                                senderName={message.sender.username}
                            />
                        ))}
                    <div ref={messagesEndRef} />
                </ul>
            </div>

            <ChatInput
                sendMessage={sendMessage}
                username={me?.username}
                channelName={props.channelName}
                setIsTyping={setIsTyping}
                setTypingUsername={setTypingUsername}
            />
        </div>
    );
}

type ChannelMessageProps = {
    avatar: string;
    text: string;
    isMe: boolean;
    senderName: string;
};

function ChannelMessage(props: ChannelMessageProps) {
    const defaultStyles =
        'text-background font-mulish px-4 py-2 w-fit max-w-[80%] hyphens-auto shadow-[5px_5px_0px_0px_rgba(37,10,59)] relative';
    const myStyles =
        'rounded-tl-xl rounded-br-xl rounded-bl-xl bg-secondary-200 self-end';
    const othersStyles =
        'rounded-bl-xl rounded-br-xl rounded-tr-xl bg-white self-start';

    const myImgStyles = '-top-5 -right-5';
    const otherImgStyles = '-top-5 -left-5';

    return (
        <li
            className={`${defaultStyles}
                        ${props.isMe ? myStyles : othersStyles}`}
        >
            <Link href={`/profile/${props.senderName}`}>
                <img
                    src={props.avatar}
                    alt={`${props.senderName}'s avatar`}
                    title={`${props.senderName}'s avatar`}
                    className={`w-8 h-8
                            object-cover
                            border-2 border-secondary-200 rounded-full
                            absolute select-none ${
                                props.isMe ? myImgStyles : otherImgStyles
                            }`}
                />
            </Link>
            {props.text}
        </li>
    );
}
