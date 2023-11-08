'use client';

import Modal from '@/components/Modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Lottie from 'lottie-react';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import path from 'path';
import { ReactNode, useEffect, useState } from 'react';
import Ghost from '../../../public/lottie/ghost.json';
import Loading from '../loading';

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

function LeaveChannelModal(props: {
    channelName: string;
    setShowLeaveModal: (val: boolean) => void;
    setRedirectChannel: (val: boolean) => void;
}) {
    const { mutate: leaveChannel, isLoading } = useMutation({
        mutationFn: async () => {
            await axios.delete(`/api/chat/channel/leave/${props.channelName}`, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            props.setRedirectChannel(true);
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
        <Modal
            onClose={() => props.setShowLeaveModal(false)}
            childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%]
                    max-w-[400px]"
        >
            <h1 className="text-center text-xl font-jost">
                Leave channel{' '}
                <span className="text-secondary-200">{props.channelName}</span>?
            </h1>
            <div className="w-full flex justify-center gap-4 pt-4">
                <button
                    type="button"
                    title="Leave channel"
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
                    onClick={() => props.setShowLeaveModal(false)}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}

function DeleteChannelModal(props: {
    channelName: string;
    setShowDeleteModal: (val: boolean) => void;
    setRedirectChannel: (val: boolean) => void;
}) {
    const { mutate: deleteChannel, isLoading } = useMutation({
        mutationFn: async () => {
            await axios.delete(`/api/chat/channel/${props.channelName}`, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            props.setRedirectChannel(true);
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
        <Modal
            onClose={() => props.setShowDeleteModal(false)}
            childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%]
                    max-w-[400px]"
        >
            <h1 className="text-center text-xl font-jost">
                Delete channel{' '}
                <span className="text-secondary-200">{props.channelName}</span>?
            </h1>
            <div className="w-full flex justify-center gap-4 pt-4">
                <button
                    type="button"
                    title="Delete channel"
                    className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                    onClick={() => {
                        deleteChannel();
                    }}
                >
                    OK
                </button>
                <button
                    className="bg-background rounded-2xl px-4
                                    border border-white text-red-400
                                    font-jost hover:bg-red-400
                                    hover:text-background"
                    onClick={() => props.setShowDeleteModal(false)}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}

function NewOwnerModal(props: {
    channelName: string;
    setNewOwnerUsername: (val: string) => void;
    setShowNewOwnerModal: (val: boolean) => void;
    setShowNewOwnerDialog: (val: boolean) => void;
}) {
    const { data: channelMembers, isLoading } = useQuery({
        queryKey: ['channel', props.channelName, 'members'],
        queryFn: async () => {
            const { data } = await axios.get(
                `/api/chat/channel/${props.channelName}/members`,
                { withCredentials: true },
            );
            return data;
        },
    });

    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        if (!channelMembers?.members || !channelMembers?.admins) return;
        setResults(
            filterMembers(channelMembers?.members, channelMembers?.admins, ''),
        );
    }, [channelMembers]);

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    function filterMembers(members: any[], admins: any[], query: string) {
        const filteredMembers = members.filter((member) => {
            return (
                member.username.toLowerCase().includes(query.toLowerCase()) ||
                member.fullname.toLowerCase().includes(query.toLowerCase())
            );
        });
        const filteredAdmins = admins.filter((admin) => {
            return (
                admin.username.toLowerCase().includes(query.toLowerCase()) ||
                admin.fullname.toLowerCase().includes(query.toLowerCase())
            );
        });
        return [
            ...filteredAdmins.map((admin) => {
                return { ...admin, isAdmin: true };
            }),
            ...filteredMembers.map((member) => {
                return { ...member, isAdmin: false };
            }),
        ];
    }

    return (
        <>
            <Modal
                onClose={() => props.setShowNewOwnerModal(false)}
                childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%] h-[300px]
                                        lg:w-2/3 max-w-[600px]"
            >
                <div
                    className="text-white accent-secondary-200
                flex flex-col gap-2 font-jost"
                >
                    <h1 className="text-secondary-200 text-center text-2xl mb-4">
                        Set new owner
                    </h1>
                    <input
                        type="text"
                        autoFocus
                        placeholder="Search"
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                            }
                        }}
                        onChange={(event) => {
                            event.preventDefault();
                            const query = event.target.value;
                            if (query === '') {
                                setResults([]);
                                return;
                            }
                            const newResults = filterMembers(
                                channelMembers?.members,
                                channelMembers?.admins,
                                query,
                            );
                            setResults(newResults);
                        }}
                        className="bg-background text-white accent-secondary-200
						outline-none
						border-2 border-secondary-200
						rounded-2xl px-2 py-1"
                    />
                    {results.length !== 0 && (
                        <ul
                            className="bg-primary border-[0.5px] border-secondary-200 p-2 max-h-36
							overflow-y-scroll scrollbar-thumb-secondary-200 scrollbar-thin"
                        >
                            {results.map((result, idx) => (
                                <button
                                    onClick={() => {
                                        props.setShowNewOwnerModal(false);
                                        props.setNewOwnerUsername(
                                            result.username,
                                        );
                                        props.setShowNewOwnerDialog(true);
                                    }}
                                    key={idx}
                                    className="hover:bg-background/80 hover:rounded-xl block w-full text-left py-1"
                                >
                                    <li className="flex items-center gap-4 pr-4">
                                        <img
                                            src={result.avatar}
                                            alt={`${result.username}'s profile picture`}
                                            className="w-12 h-12 rounded-full object-cover
                                        border-[1px] border-secondary-200 font-jost flex-shrink-0"
                                        />
                                        <div className="flex flex-col flex-grow">
                                            <p>{result.fullname}</p>
                                            <p className="text-secondary-200 italic">
                                                @{result.username}
                                            </p>
                                        </div>
                                        <div className="font-mulish italic">
                                            {result.isAdmin && 'Admin'}
                                        </div>
                                    </li>
                                </button>
                            ))}
                        </ul>
                    )}
                    {channelMembers?.admins.length === 0 &&
                        channelMembers?.members.length === 0 && (
                            <>
                                <div className="w-[20%] mx-auto">
                                    <Lottie animationData={Ghost} loop={true} />
                                </div>
                                <p className="text-center text-lg font-jost">
                                    This channel has no members other than you
                                </p>
                            </>
                        )}
                </div>
            </Modal>
        </>
    );
}

function SetNewOwnerDialog(props: {
    channelName: string;
    newOwnerUsername: string;
    setShowNewOwnerDialog: (val: boolean) => void;
}) {
    const queryClient = useQueryClient();
    const { mutate: changeOwner, isLoading } = useMutation({
        mutationFn: async (args: any) => {
            return await axios.post('/api/chat/channel/change-owner', {
                withCredentials: true,
                ...args,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([
                'channel',
                props.channelName,
                'members',
            ]);
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
        <Modal
            onClose={() => props.setShowNewOwnerDialog(false)}
            childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%]
                    max-w-[400px]"
        >
            <h1 className="text-center text-xl font-jost">
                Transfer ownership to{' '}
                <span className="text-secondary-200">
                    @{props.newOwnerUsername}
                </span>
                ?
            </h1>
            <div className="w-full flex justify-center gap-4 pt-4">
                <button
                    type="button"
                    title="Leave channel"
                    className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                    onClick={() => {
                        changeOwner({
                            channelName: props.channelName,
                            newOwner: props.newOwnerUsername,
                        });
                        props.setShowNewOwnerDialog(false);
                    }}
                >
                    OK
                </button>
                <button
                    className="bg-background rounded-2xl px-4
                                    border border-white text-red-400
                                    font-jost hover:bg-red-400
                                    hover:text-background"
                    onClick={() => props.setShowNewOwnerDialog(false)}
                >
                    Cancel
                </button>
            </div>
        </Modal>
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
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showNewOwnerModal, setShowNewOwnerModal] = useState(false);
    const [showNewOwnerDialog, setShowNewOwnerDialog] = useState(false);
    const [newOwnerUsername, setNewOwnerUsername] = useState('');

    useEffect(() => {
        if (!redirectChannel) return;
        redirect('/chat');
    }, [redirectChannel]);

    if (channelIsLoading || meIsLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    return (
        <>
            {showLeaveModal && (
                <LeaveChannelModal
                    channelName={props.channelName}
                    setShowLeaveModal={setShowLeaveModal}
                    setRedirectChannel={setRedirectChannel}
                />
            )}

            {showDeleteModal && (
                <DeleteChannelModal
                    channelName={props.channelName}
                    setShowDeleteModal={setShowDeleteModal}
                    setRedirectChannel={setRedirectChannel}
                />
            )}

            {showNewOwnerModal && (
                <NewOwnerModal
                    channelName={props.channelName}
                    setShowNewOwnerModal={setShowNewOwnerModal}
                    setShowNewOwnerDialog={setShowNewOwnerDialog}
                    setNewOwnerUsername={setNewOwnerUsername}
                />
            )}
            {showNewOwnerDialog && (
                <SetNewOwnerDialog
                    channelName={props.channelName}
                    newOwnerUsername={newOwnerUsername}
                    setShowNewOwnerDialog={setShowNewOwnerDialog}
                />
            )}

            {channel?.owner.username === me?.username && (
                <ChatMenuItem>
                    <button onClick={() => setShowDeleteModal(true)}>
                        Delete channel
                    </button>
                </ChatMenuItem>
            )}
            {channel?.owner.username !== me?.username && (
                <ChatMenuItem>
                    <button onClick={() => setShowLeaveModal(true)}>
                        Leave channel
                    </button>
                </ChatMenuItem>
            )}
            {channel?.owner.username === me?.username && (
                <ChatMenuItem>
                    <button onClick={() => setShowNewOwnerModal(true)}>
                        Set new owner
                    </button>
                </ChatMenuItem>
            )}
            <ChatMenuItem>
                <button>Channel</button>
            </ChatMenuItem>
        </>
    );
}
