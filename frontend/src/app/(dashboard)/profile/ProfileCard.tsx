'use client';
import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import { useSocket } from '@/contexts/SocketContext';
import useInvite from '@/hooks/useInvite';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
    AiFillTrophy,
    AiOutlineCheckCircle,
    AiOutlineClose,
} from 'react-icons/ai';
import {
    TbMessage2,
    TbUserCancel,
    TbUserPlus,
    TbUserX,
    TbUserOff,
} from 'react-icons/tb';
import { FaGamepad } from 'react-icons/fa';
import UserCircleInfo from './UserCircleInfo';
import { nanoid } from 'nanoid';
import { redirect } from 'next/navigation';
import { set } from 'react-hook-form';

type ProfileCardProps = {
    username: string;
};

function InviteGameModal({
    username,
    avatar,
    id,
    setHidden,
    sender,
    senderId,
}: {
    username: string;
    sender: string;
    avatar: string;
    id: string;
    setHidden: any;
    senderId: string;
}) {
    const { socket } = useSocket();
    const { mutate: createNotification } = useInvite();
    const [Challenge, setChallenge] = useState(false);
    const [myId, setId] = useState(id);

    const queryClient = useQueryClient();

    useEffect(() => {
        if (Challenge) redirect(`/game/ranked/${id}`);
    }, [Challenge, id]);

    return (
        <Modal
            onClose={() => setHidden(false)}
            childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl border-r-2 border-l-2 border-secondary-500 w-[90%]
                    max-w-[400px] h-44 flex flex-col justify-evenly"
        >
            <h1 className="text-center text-xl font-jost">
                Invite <span className="text-secondary-200">@{username}</span>{' '}
                to a game?
                <p className="text-lg font-jockey text-red-500">
                    {' '}
                    you will redirect to the game page !
                </p>
            </h1>
            <div className="w-full flex justify-center gap-4 pt-4">
                <button
                    type="button"
                    title="Invite"
                    className="bg-background rounded-2xl px-4
                                    border border-white text-secondary-200
                                    font-jost hover:bg-secondary-200
                                    hover:text-background"
                    onClick={() => {
                        if (!Challenge) {
                            setId(myId);
                            setTimeout(() => {
                                console.log('id: ', myId);
                                createNotification({
                                    id: senderId,
                                    type: 'GAME',
                                    ChallengeId: myId,
                                });
                                socket?.emit('notifications', username);
                                socket?.emit('notif', {
                                    sender: sender,
                                    username: username,
                                    type: 'GAME',
                                    avatar: avatar,
                                    ChallengeId: myId,
                                });
                                setChallenge(true);
                            }, 2000);
                        }
                    }}
                >
                    OK
                </button>
                <button
                    className="bg-background rounded-2xl px-4
                                    border border-white text-red-400
                                    font-jost hover:bg-red-400
                                    hover:text-background"
                    onClick={() => setHidden(false)}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}

export default function ProfileCard({ username }: ProfileCardProps) {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [Challenge, setChallenge] = useState(false);
    const [id, setId] = useState('');
    const { socket } = useSocket();

    const { mutate: createNotification } = useInvite();

    const queryClient = useQueryClient();

    const { mutate: removeFriend } = useMutation({
        mutationFn: async () => {
            return await axios.delete(`/api/friends/remove/${username}`, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['isFriend', username], {
                exact: true,
            });
            queryClient.invalidateQueries(['userFriends', username], {
                exact: true,
            });
        },
    });

    const { mutate: blockUser } = useMutation({
        mutationFn: async () => {
            return await axios.post(`/api/friends/block/${username}`, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['isBlocked', username], {
                exact: true,
            });
            queryClient.invalidateQueries(['profile', username]);
        },
    });

    const { mutate: unBlockUser } = useMutation({
        mutationFn: async () => {
            return await axios.post(`/api/friends/unblock/${username}`, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['isBlocked', username], {
                exact: true,
            });
            queryClient.invalidateQueries(['profile', username]);
        },
    });

    const { data: visitedUser, isLoading: visitedUserLoading } = useQuery({
        queryKey: ['profile', username, 'me'],
        queryFn: async () => {
            const { data } = await axios.get(
                `/api/user/get/${username}/stats`,
                {
                    withCredentials: true,
                },
            );
            const { data: me } = await axios.get(`/api/user/me`, {
                withCredentials: true,
            });

            return { data, me };
        },
    });

    const { data: friendship, isLoading: friendshipLoading } = useQuery({
        queryKey: ['isFriend', username],
        queryFn: async () => {
            const { data } = await axios.get(`/api/user/isFriend/${username}`, {
                withCredentials: true,
            });
            return data;
        },
    });

    const { data: isBlocked, isLoading } = useQuery({
        queryKey: ['isBlocked', username],
        queryFn: async () => {
            const { data: Blocked } = await axios.get(
                `/api/friends/isBlocked/${username}`,
                {
                    withCredentials: true,
                },
            );

            const { data: BlockedBy } = await axios.get(
                `/api/friends/isBlockedBy/${username}`,
                {
                    withCredentials: true,
                },
            );
            return { blocked: Blocked, blockedBy: BlockedBy };
        },
    });

    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        if (Challenge) redirect(`/game/ranked/${id}`);
    }, [Challenge, id]);

    if (visitedUserLoading || friendshipLoading || isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    const leagueImgPath = `/images/${visitedUser?.data.stats.league.toLowerCase()}-league.svg`;

    return (
        <div
            className="bg-primary
        border-2 border-secondary-200 rounded-3xl
        h-30 md:h-36
        flex flex-col justify-between"
        >
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    childrenClassName="bg-background p-6 rounded-2xl border-2 border-white w-[90%]
                    max-w-[400px]"
                >
                    <h1 className="text-center text-xl font-jost">
                        {message}{' '}
                        <span className="text-secondary-200">@{username}</span>?
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
                                if (message === 'Block user?') blockUser();
                                else if (message === 'Unblock user?')
                                    unBlockUser();
                                else if (message === 'Remove friend?')
                                    removeFriend();
                                socket?.emit('profile', {
                                    user1: visitedUser?.me.username,
                                    user2: username,
                                });
                                setShowModal(false);
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
            {hidden && (
                <InviteGameModal
                    sender={visitedUser?.data.username}
                    username={visitedUser?.me.username}
                    avatar={visitedUser?.me.avatar}
                    id={id}
                    setHidden={setHidden}
                    senderId={visitedUser?.data.id}
                />
            )}

            {/* Notification modal */}
            {showNotification && (
                <motion.div
                    className="absolute
                                top-44 md:top-32 lg:top-52
                                right-4
                                bg-green-400 text-primary
                                text-center font-jost
                                px-4 py-2 rounded-xl
                                flex gap-2 items-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: 0,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                >
                    <AiOutlineCheckCircle className="text-xl font-bold" />
                    <p>Friend request sent successfully</p>
                </motion.div>
            )}

            <div className="flex items-start relative">
                <div className="absolute bottom-0 md:-bottom-2">
                    <UserCircleInfo username={username} />
                </div>
                <div className="flex items-center justify-between pt-2 pl-1 ml-24 md:ml-32 gap-4">
                    <div>
                        <h1 className="text-secondary-200 font-mulish font-bold text-xl md:text-2xl">
                            {visitedUser?.data.fullname}
                        </h1>
                        <h2 className="text-cube_palette-200 opacity-80 font-mulish text-lg">
                            @{visitedUser?.data.username}
                        </h2>
                    </div>
                    <img
                        src={leagueImgPath}
                        alt="League"
                        title={`${visitedUser?.data.stats.league.toLowerCase()} league`}
                        className="ml-2 select-none"
                    />
                </div>
            </div>

            <div className="m-4 text-xl flex justify-between">
                <div className="flex gap-1 items-center md:text-2xl">
                    <div className="flex items-center text-online">
                        <AiFillTrophy />
                        <span>{visitedUser?.data.stats.wins}</span>
                    </div>
                    <div className="flex items-center text-red-600">
                        <AiOutlineClose />
                        <span>{visitedUser?.data.stats.losses}</span>
                    </div>
                </div>

                <div className="flex gap-4 text-secondary-200 items-center md:text-2xl">
                    {/* Not me and my friend - Message */}
                    {!friendship.isMe && friendship.isFriend && (
                        <>
                            <Link
                                href={`#`}
                                onClick={() => {
                                    setId(nanoid());
                                    setHidden(true);
                                }}
                            >
                                <FaGamepad />
                            </Link>
                            <Link href={`/chat/dm/${username}`}>
                                <TbMessage2 />
                            </Link>
                        </>
                    )}

                    {/* Not me and my friend - Remove friend */}
                    {!friendship.isMe && friendship.isFriend && (
                        <button
                            type="button"
                            title="Remove friend"
                            onClick={() => {
                                setMessage('Remove friend?');
                                setShowModal(true);
                                socket?.emit('profile', {
                                    user1: visitedUser?.me.username,
                                    user2: username,
                                });
                            }}
                        >
                            <TbUserX />
                        </button>
                    )}

                    {/* Not me and not my friend - Add friend */}
                    {!isBlocked?.blocked &&
                        !friendship.isMe &&
                        !friendship.isFriend && (
                            <button
                                type="button"
                                title="Send a friend request"
                                onClick={() => {
                                    if (!isBlocked?.blockedBy) {
                                        if (!showNotification) {
                                            setShowNotification(true);
                                            setTimeout(
                                                () =>
                                                    setShowNotification(false),
                                                2000,
                                            );
                                        }
                                        createNotification({
                                            id: visitedUser?.data.id,
                                            type: 'FRIEND',
                                        });
                                        socket?.emit(
                                            'notifications',
                                            visitedUser?.data.username,
                                        );
                                        socket?.emit('notif', {
                                            sender: visitedUser?.data.username,
                                            username: visitedUser?.me.username,
                                            type: 'FRIEND',
                                            avatar: visitedUser?.me.avatar,
                                        });
                                    }
                                }}
                            >
                                <TbUserPlus />
                            </button>
                        )}

                    {/* Not me - Block */}

                    {isBlocked?.blocked ? (
                        <button
                            type="button"
                            title="unBlock user"
                            onClick={() => {
                                setMessage('Unblock user?');
                                setShowModal(true);
                            }}
                        >
                            <TbUserOff />
                        </button>
                    ) : (
                        !friendship.isMe && (
                            <button
                                type="button"
                                title="Block user"
                                onClick={() => {
                                    setMessage('Block user?');
                                    setShowModal(true);
                                }}
                            >
                                <TbUserCancel />
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
