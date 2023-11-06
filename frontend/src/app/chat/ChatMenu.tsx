'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import path from 'path';
import { ReactNode, useEffect, useState } from 'react';
import Loading from '../loading';
import Modal from '@/components/Modal';

export default function ChatMenu() {
    const pathname = usePathname();
    const currentPage = path.basename(pathname);

    if (currentPage === 'chat') return null;

    return (
        <ul
            className="w-36 p-2 text-center bg-background
                        flex flex-col gap-2
                        border-[1px] border-secondary-200 rounded-2xl"
        >
            {pathname.startsWith('/chat/dm') && (
                <DmMenu username={currentPage} />
            )}
            {pathname.startsWith('/chat/channel') && (
                <ChannelMenu channelName={currentPage} />
            )}
        </ul>
    );
}

function ChatMenuItem(props: { children: ReactNode }) {
    return (
        <li className="text-silver hover:bg-primary hover:rounded-xl py-1">
            {props.children}
        </li>
    );
}

function DmMenu(props: { username: string }) {
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    const { data: dm, isLoading: dmIsLoding } = useQuery({
        queryFn: async () => {
            console.log(props.username);
            const { data: dm } = await axios.get(
                `/api/chat/dm/${props.username}`,
                {
                    withCredentials: true,
                },
            );
            return dm;
        },
    });

    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate, isLoading: mutationIsLoading } = useMutation({
        mutationFn: async () => {
            return await axios.delete(`/api/chat/dm/${dm.id}`, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['dm', props.username], {
                exact: true,
            });
            queryClient.invalidateQueries(['dms', 'brief'], { exact: true });
        },
    });

    if (dmIsLoding || mutationIsLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    return (
        <>
            {showClearConfirm && (
                <Modal
                    onClose={() => setShowClearConfirm(false)}
                    childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%]
                    max-w-[400px]"
                >
                    <h1 className="text-center text-xl font-jost">
                        Clear chat with{' '}
                        <span className="text-secondary-200">
                            @{props.username}
                        </span>
                        ?
                    </h1>
                    <div className="w-full flex justify-center gap-4 pt-4">
                        <button
                            className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                            onClick={() => {
                                mutate();
                                router.replace('/chat');
                            }}
                        >
                            OK
                        </button>
                        <button
                            className="bg-background rounded-2xl px-4
                                    border border-white text-red-400
                                    font-jost hover:bg-red-400
                                    hover:text-background"
                            onClick={() => setShowClearConfirm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}
            <ChatMenuItem>
                <Link href={`/profile/${props.username}`}>View Profile</Link>
            </ChatMenuItem>
            <ChatMenuItem>
                <button>Invite to Game</button>
            </ChatMenuItem>
            <ChatMenuItem>
                <button>Block</button>
            </ChatMenuItem>
            <ChatMenuItem>
                <button
                    className="text-[red]"
                    onClick={() => setShowClearConfirm(true)}
                >
                    Clear Chat
                </button>
            </ChatMenuItem>
        </>
    );
}

function ChannelMenu(props: { channelName: string }) {
    const { data: channel, isLoading: channelIsLoading } = useQuery({
        queryKey: ['channel', props.channelName],
        queryFn: async () => {
            const { data } = await axios.get(
                `/api/chat/channel/${props.channelName}`,
                { withCredentials: true },
            );
            return data;
        },
    });

    const { data: me, isLoading: meIsLoading } = useQuery({
        queryKey: ['user', 'me'],
        queryFn: async () => {
            const { data } = await axios.get('/api/user/me', {
                withCredentials: true,
            });
            return data;
        },
    });

    const [redirectChannel, setRedirectChannel] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!redirectChannel) return;
        redirect('/chat');
    }, [redirectChannel]);

    const { mutate: deleteChannel, isLoading: deleteChannelIsLoading } =
        useMutation({
            mutationFn: async () => {
                await axios.delete(`/api/chat/channel/${props.channelName}`, {
                    withCredentials: true,
                });
            },
            onSuccess: () => {
                setRedirectChannel(true);
            },
        });

    const { mutate: leaveChannel, isLoading: leaveChannelIsLoading } =
        useMutation({
            mutationFn: async () => {
                await axios.delete(
                    `/api/chat/channel/leave/${props.channelName}`,
                    { withCredentials: true },
                );
            },
            onSuccess: () => {
                setRedirectChannel(true);
            },
        });

    if (
        channelIsLoading ||
        meIsLoading ||
        deleteChannelIsLoading ||
        leaveChannelIsLoading
    ) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    return (
        <>
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%]
                    max-w-[400px]"
                >
                    <h1 className="text-center text-xl font-jost">
                        Leave channel{' '}
                        <span className="text-secondary-200">
                            {props.channelName}
                        </span>
                        ?
                    </h1>
                    <div className="w-full flex justify-center gap-4 pt-4">
                        <button
                            type="button"
                            title="Remove friend"
                            className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                            onClick={() => {
                                leaveChannel();
                            }}
                        >
                            OK
                        </button>
                        <button
                            className="bg-background rounded-2xl px-4
                                    border border-white text-red-400
                                    font-jost hover:bg-red-400
                                    hover:text-background"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}
            {channel?.owner.username === me?.username && (
                <ChatMenuItem>
                    <button onClick={() => deleteChannel()}>
                        Delete channel
                    </button>
                </ChatMenuItem>
            )}
            {channel?.owner.username !== me?.username && (
                <ChatMenuItem>
                    <button onClick={() => setShowModal(true)}>
                        Leave channel
                    </button>
                </ChatMenuItem>
            )}
            <ChatMenuItem>
                <button>Channel</button>
            </ChatMenuItem>
            <ChatMenuItem>
                <button>Channel</button>
            </ChatMenuItem>
        </>
    );
}
