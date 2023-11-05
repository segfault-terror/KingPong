'use client';
import Loading from '@/app/loading';
import Modal from '@/components/Modal';
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
import { TbMessage2, TbUserCancel, TbUserPlus, TbUserX } from 'react-icons/tb';
import UserCircleInfo from './UserCircleInfo';
import useInvite from '@/hooks/useInvite';
import { useSocket } from '@/contexts/SocketContext';
import { set } from 'react-hook-form';

type ProfileCardProps = {
    username: string;
};

export default function ProfileCard({ username }: ProfileCardProps) {
    const [showModal, setShowModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
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

    const { data: visitedUser, isLoading: visitedUserLoading } = useQuery({
        queryKey: ['profile', username],
        queryFn: async () => {
            const { data } = await axios.get(
                `/api/user/get/${username}/stats`,
                {
                    withCredentials: true,
                },
            );
            return data;
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

    if (visitedUserLoading || friendshipLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    const leagueImgPath = `/images/${visitedUser?.stats.league.toLowerCase()}-league.svg`;

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
                        Remove friend{' '}
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
                                removeFriend();
                                socket?.emit('profile', username);
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
                            {visitedUser.fullname}
                        </h1>
                        <h2 className="text-cube_palette-200 opacity-80 font-mulish text-lg">
                            @{visitedUser.username}
                        </h2>
                    </div>
                    <img
                        src={leagueImgPath}
                        alt="League"
                        title={`${visitedUser?.stats.league.toLowerCase()} league`}
                        className="ml-2 select-none"
                    />
                </div>
            </div>

            <div className="m-4 text-xl flex justify-between">
                <div className="flex gap-1 items-center md:text-2xl">
                    <div className="flex items-center text-online">
                        <AiFillTrophy />
                        <span>{visitedUser?.stats.wins}</span>
                    </div>
                    <div className="flex items-center text-red-600">
                        <AiOutlineClose />
                        <span>{visitedUser?.stats.losses}</span>
                    </div>
                </div>

                <div className="flex gap-4 text-secondary-200 items-center md:text-2xl">
                    {/* Not me and my friend - Message */}
                    {!friendship.isMe && friendship.isFriend && (
                        <Link href={`/chat/dm/${username}`}>
                            <TbMessage2 />
                        </Link>
                    )}

                    {/* Not me and my friend - Remove friend */}
                    {!friendship.isMe && friendship.isFriend && (
                        <button
                            type="button"
                            title="Remove friend"
                            onClick={() => {
                                setShowModal(true);
                                socket?.emit('profile', username);
                            }}
                        >
                            <TbUserX />
                        </button>
                    )}

                    {/* Not me and not my friend - Add friend */}
                    {!friendship.isMe && !friendship.isFriend && (
                        <button
                            type="button"
                            title="Send a friend request"
                            onClick={() => {
                                console.log(
                                    'emited notification to ',
                                    visitedUser.username,
                                );

                                if (!showNotification) {
                                    setShowNotification(true);
                                    setTimeout(
                                        () => setShowNotification(false),
                                        2000,
                                    );
                                }
                                createNotification({
                                    id: visitedUser.id,
                                    type: 'FRIEND',
                                });
                                socket?.emit(
                                    'notifications',
                                    visitedUser.username,
                                );
                            }}
                        >
                            <TbUserPlus />
                        </button>
                    )}

                    {/* Not me and my friend - Block */}
                    {!friendship.isMe && friendship.isFriend && (
                        <button
                            type="button"
                            title="Block user"
                            onClick={() => console.log(`Block ${username}`)}
                        >
                            <TbUserCancel />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
