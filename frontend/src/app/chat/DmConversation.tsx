'use client';
import { modalContext } from '@/contexts/contexts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useContext } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import Loading from '../loading';
import ChatInput from './ChatInput';
import { getStatusColor } from './DirectMessage';
import Modal from './Modal';

export type DmConversationProps = {
    userName: string;
};

export default function DmConversation({ userName }: DmConversationProps) {
    return (
        <div
            className="flex flex-col gap-8 h-full
                bg-primary
                rounded-2xl
                px-4 py-3
                border-secondary-200 border-[1px]"
        >
            <DmConversationHeader userName={userName} />
            <div className="flex-grow overflow-y-scroll scrollbar-none pb-2">
                <DmMessageList userName={userName} />
            </div>

            <ChatInput />
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

function DmConversationHeader({ userName }: DmConversationProps) {
    const { setDotsDropdown } = useContext(modalContext);

    return (
        <>
            <div className="flex justify-between items-center">
                <UserDMInfo userName={userName} />
                <button onClick={() => setDotsDropdown(true)}>
                    <HiDotsVertical className="text-secondary-200 h-8 w-8" />
                </button>
            </div>
        </>
    );
}

function UserDMInfo({ userName }: DmConversationProps) {
    const { data: user, isLoading } = useQuery({
        queryKey: ['user', userName],
        queryFn: async () => {
            const result = await axios.get(`/api/user/get/${userName}`, {
                withCredentials: true,
            });
            return result.data;
        },
    });

    if (isLoading) return <div>Loading...</div>;

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
                    <div
                        className={`w-3 h-3 rounded-full ${statusColor}`}
                    ></div>
                    <p className="text-white text-xs select-none">
                        {statusMsg}
                    </p>
                </div>
            </div>
        </div>
    );
}

function DmMessageList({ userName }: DmConversationProps) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['dm', userName],
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const { data: me } = await axios.get('/api/user/me', {
                withCredentials: true,
            });
            const { data: dms } = await axios.get(
                `/api/chat/dm/${userName}/${me.username}`,
                { withCredentials: true },
            );
            return { me, dms };
        },
    });

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
                    <Modal onClose={() => {}}>
                        <div
                            className="bg-background w-[400px] border-secondary-200
                                    border-2 p-4 text-center rounded-2xl font-jost
                                    flex flex-col gap-4"
                        >
                            <h1 className="text-2xl text-red-500">Error</h1>
                            <p className="text-xl">
                                <Link
                                    href={`/profile/${userName}`}
                                    className="text-secondary-200 hover:underline"
                                >
                                    @{userName}
                                </Link>{' '}
                                is not your friend
                            </p>

                            <Link
                                href="/chat"
                                className="bg-secondary-200 text-primary p-2 rounded-2xl"
                            >
                                Go back
                            </Link>
                        </div>
                    </Modal>
                );
            case 418:
                return (
                    <Modal onClose={() => {}}>
                        <div
                            className="bg-background w-[400px] border-secondary-200
                                    border-2 p-4 text-center rounded-2xl font-jost
                                    flex flex-col gap-4"
                        >
                            <h1 className="text-2xl text-red-500">Error</h1>
                            <p className="text-xl">
                                You cannot message yourself
                            </p>

                            <Link
                                href="/chat"
                                className="bg-secondary-200 text-primary p-2 rounded-2xl"
                            >
                                Go back
                            </Link>
                        </div>
                    </Modal>
                );

            default:
                break;
        }
    }

    if (!data?.dms || data?.dms.length === 0)
        return (
            <div className="text-cube_palette-200 font-jost font-light text-center">
                Send a private message to {userName}
            </div>
        );

    function generateMessage(msg: any) {
        const userStyles =
            'rounded-bl-xl rounded-br-xl rounded-tr-xl bg-white self-start';
        const myStyles =
            'rounded-tl-xl rounded-tr-xl rounded-bl-xl bg-secondary-200 self-end';

        return (
            <li
                key={msg.id}
                className={`text-background font-mulish p-2 w-fit max-w-[80%] hyphens-auto
                            shadow-[5px_5px_0px_0px_rgba(37,10,59)]
                            ${
                                msg.sender_id == data?.me.id
                                    ? myStyles
                                    : userStyles
                            }`}
            >
                {msg.message}
            </li>
        );
    }

    return (
        <ul className="flex flex-col gap-2">
            {data?.dms.map((msg: any) => generateMessage(msg))}
        </ul>
    );
}
