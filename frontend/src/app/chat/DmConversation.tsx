'use client';
import { modalContext } from '@/contexts/contexts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { ReactNode, use, useContext, useEffect, useRef, useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import Loading from '../loading';
import ChatInput from './ChatInput';
import { getStatusColor } from './DirectMessage';
import Modal from '@/components/Modal';
import { useSocket } from '@/contexts/SocketContext';
import DropdownModal from './DropdownModal';
import ChatMenu from './ChatMenu';

export type DmConversationProps = {
    userName: string;
};

type DmConversationHeaderProps = DmConversationProps & { isTyping: boolean };

type UserDMInfoProps = DmConversationHeaderProps;

export default function DmConversation({ userName }: DmConversationProps) {
    const queryClient = useQueryClient();
    const [isTyping, setIsTyping] = useState(false);
    const { socket } = useSocket();

    const { mutate } = useMutation({
        mutationFn: async (content: string) => {
            return await axios.post('/api/chat/dm/message', {
                withCredentials: true,
                content,
                sender: me.username,
                receiver: userName,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['dm', userName], { exact: true });
            queryClient.invalidateQueries(['dms', 'brief'], { exact: true });
            socket?.emit('new-message', userName);
        },
    });

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
        <div
            className="flex flex-col h-full
                bg-primary
                rounded-2xl
                px-4 py-3
                border-secondary-200 border-[1px]
                relative
                "
        >
            <div className="absolute inset-0 bg-chatBg rounded-2xl opacity-5 z-0" />
            <DmConversationHeader userName={userName} isTyping={isTyping} />
            <div className="flex-grow overflow-y-scroll scrollbar-none pb-2 pt-2 px-2 z-20">
                <DmMessageList userName={userName} />
            </div>

            <ChatInput
                sendMessage={mutate}
                username={userName}
                setIsTyping={setIsTyping}
            />
        </div>
    );
}

function getStatusMsg(status: string) {
    switch (status) {
        case 'ONLINE':
            return 'online';
        case 'OFFLINE':
            return 'offline';
        case 'INGAME':
            return 'in game';
        default:
            throw new Error('Invalid user status');
    }
}

function DmConversationHeader({
    userName,
    isTyping,
}: DmConversationHeaderProps) {
    const { dotsDropdown, setDotsDropdown } = useContext(modalContext);

    return (
        <>
            <div
                className="flex justify-between items-center
                        bg-gradient-to-b from-background/60 to-[#330E51]/60
                        p-4 rounded-lg z-20"
            >
                <UserDMInfo userName={userName} isTyping={isTyping} />
                <button onClick={() => setDotsDropdown(true)}>
                    <HiDotsVertical className="text-secondary-200 h-8 w-8" />
                </button>
                {dotsDropdown && (
                    <DropdownModal
                        onClose={() => setDotsDropdown(false)}
                        childrenClassName="top-[246px] md:top-[200px] lg:top-[192px] right-16"
                    >
                        <ChatMenu />
                    </DropdownModal>
                )}
            </div>
        </>
    );
}

function UserDMInfo({ userName, isTyping }: UserDMInfoProps) {
    const { data: user, isLoading } = useQuery({
        queryKey: ['user', userName],
        queryFn: async () => {
            const result = await axios.get(`/api/user/get/${userName}`, {
                withCredentials: true,
            });
            return result.data;
        },
    });

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    const statusColor = getStatusColor(user.status);
    const statusMsg = getStatusMsg(user.status);

    return (
        <div className="flex items-center gap-3">
            <Link href={`/profile/${userName}`}>
                <img
                    src={user.avatar}
                    alt={`${userName}'s avatar`}
                    className="w-12 h-12 object-cover
                                border-[2px] border-secondary-200 rounded-full select-none
                                bg-background"
                />
            </Link>

            <div>
                <Link href={`/profile/${userName}`}>
                    <h1 className="text-white text-lg font-bold">{userName}</h1>
                </Link>
                <div className="flex items-center gap-1">
                    {isTyping ? (
                        <p className="text-secondary-500 text-xs select-none">
                            Typing...
                        </p>
                    ) : (
                        <>
                            <div
                                className={`w-3 h-3 rounded-full ${statusColor}`}
                            ></div>
                            <p className="text-white text-xs select-none">
                                {statusMsg}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function InvalidDm(props: { children: ReactNode }) {
    return (
        <Modal onClose={() => {}}>
            <div
                className="bg-background w-[400px] border-secondary-200
                            border-2 p-4 text-center rounded-2xl font-jost
                            flex flex-col gap-4"
            >
                <h1 className="text-2xl text-red-500">Error</h1>
                <p className="text-xl">{props.children}</p>

                <Link
                    href="/chat"
                    className="bg-secondary-200 text-primary p-2 rounded-2xl"
                >
                    Go back
                </Link>
            </div>
        </Modal>
    );
}

function DmMessageList({ userName }: DmConversationProps) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['dm', userName],
        refetchOnWindowFocus: () => {
            if (isError) return false;
            return true;
        },
        queryFn: async () => {
            const { data: me } = await axios.get('/api/user/me', {
                withCredentials: true,
            });
            const { data: dm } = await axios.get(`/api/chat/dm/${userName}`, {
                withCredentials: true,
            });
            return { me, dm };
        },
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [data]);

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    if (isError) {
        switch ((error as any).response.data.statusCode) {
            case 400:
                return (
                    <InvalidDm>
                        <Link
                            href={`/profile/${userName}`}
                            className="text-secondary-200 hover:underline"
                        >
                            @{userName}
                        </Link>{' '}
                        is not your friend
                    </InvalidDm>
                );
            case 418:
                return <InvalidDm>You cannot message yourself</InvalidDm>;

            default:
                break;
        }
    }

    if (!data?.dm || data?.dm.messages.length === 0)
        return (
            <div className="text-cube_palette-200 font-jost font-light text-center">
                Send a private message to {userName}
            </div>
        );

    function Message(props: { msg: any }) {
        const userStyles =
            'rounded-bl-xl rounded-br-xl rounded-tr-xl bg-white self-start';
        const myStyles =
            'rounded-tl-xl rounded-tr-xl rounded-bl-xl bg-secondary-200 self-end';

        return (
            <li
                className={`text-background font-mulish p-2 w-fit max-w-[80%] hyphens-auto
                            shadow-[5px_5px_0px_0px_rgba(37,10,59)]
                            ${
                                props.msg.sender.id == data?.me.id
                                    ? myStyles
                                    : userStyles
                            }`}
            >
                {props.msg.content}
            </li>
        );
    }

    return (
        <ul className="flex flex-col gap-2">
            {data?.dm.messages.map((msg: any, index: number) => (
                <Message msg={msg} key={msg.id} />
            ))}
            <div ref={messagesEndRef} />
        </ul>
    );
}
