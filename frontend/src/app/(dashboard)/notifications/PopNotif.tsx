import React, { useEffect, useState } from 'react';
import { NotificationProps } from './types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import LoadingEmpty from './EmptyLoading';
import { useSocket } from '@/contexts/SocketContext';
import { set } from 'react-hook-form';
import { redirect } from 'next/navigation';
import { GiCancel } from 'react-icons/gi';
import { FaUserFriends } from 'react-icons/fa';
import { FaGamepad } from 'react-icons/fa';

const empty: NotificationProps = {
    id: 0,
    type: 'GAME',
    readed: false,
    username: '',
    avatar: '',
    sendToId: '',
    ChallengeId: '',
};

export default function PopNotif({
    notif,
    updateModal,
    updateNotif,
    declineNotif,
    acceptNewFriend,
}: {
    notif: NotificationProps;
    updateModal: Function;
    updateNotif: Function;
    declineNotif: Function;
    acceptNewFriend: Function;
}): JSX.Element {
    const message =
        notif.type == 'GAME'
            ? `${notif.username} has invited you to a game!`
            : `${notif.username} has sent you a friend request!`;
    const bgImage =
        notif.type == 'GAME' ? '/images/fight.svg' : '/images/add-friend.svg';
    const queryClient = useQueryClient();
    const { mutate: deleteNotif, isLoading: deleteLoading } = useMutation({
        mutationFn: async (data: any) => {
            return await axios.delete(`/api/notifications/delete`, {
                data,
                withCredentials: true,
            });
        },
        onSuccess: () => {
            console.log('deleted');
            queryClient.invalidateQueries(['notifications'], {
                exact: true,
            });
        },
    });

    const {
        mutate: acceptFriend,
        isLoading: acceptLoading,
        isSuccess,
    } = useMutation({
        mutationFn: async (data: any) => {
            return await axios.post(`/api/friends/add`, data, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            console.log('accepted');
            acceptNewFriend(true);
            queryClient.invalidateQueries(['notifications'], {
                exact: true,
            });
            queryClient.invalidateQueries(['friends']);
        },
    });

    const { data: me, isLoading: meLoading } = useQuery(['me'], async () => {
        const res = await axios.get('/api/users/me', {
            withCredentials: true,
        });
        return res.data;
    });
    const { socket } = useSocket();
    const [redirected, setRedirected] = useState(false);

    useEffect(() => {
        if (redirected) {
            console.log('redirecting');
            redirect(`/game/ranked/normal/${notif.ChallengeId}`);
        }
    }, [redirected]);
    if (deleteLoading || acceptLoading || meLoading) return <LoadingEmpty />;

    return (
        <div
            key={notif.id}
            className="flex justify-center items-center relative w-full h-full"
        >
            <div className="flex flex-col justify-center items-center absolute inset-0 right-[50%] z-20 opacity-20">
                {notif.type === 'GAME' ? (
                    <FaGamepad className="w-full h-full text-black" />
                ) : (
                    <FaUserFriends className="w-full h-full text-black" />
                )}
            </div>
            <div className="w-full h-full flex flex-col justify-around items-center bg-gradient-to-tl from-primary to-background rounded-lg border-t border-b border-secondary-500 p-4">
                <div className="flex flex-col justify-between items-center m-auto z-30">
                    <img
                        src={notif.avatar}
                        alt=""
                        className="w-24 h-24 md:h-32 md:w-32 lg:h-44 lg:w-44 border-white border rounded-full mr-2 bg-background object-cover"
                    />
                    <p className="flex justify-center font-jockey items-center mx-2 text:md lg:text-2xl align-middle text-clip text-center">
                        {message}
                    </p>
                </div>
                <div className="grid grid-cols-2 w-full z-30">
                    <button
                        className="flex justify-center items-center col-span-1 bg-green-400 w-1/2 h-6 m-auto rounded-full "
                        type="button"
                        name="Accept"
                        title="Accept"
                        onClick={() => {
                            if (notif.type == 'FRIEND') {
                                console.log('me: ', me, {
                                    sender: notif.username,
                                    receiver: me.username,
                                });
                                socket?.emit('profile', {
                                    user1: me.username,
                                    user2: notif.username,
                                });
                                acceptFriend({ username: notif.username });
                                updateModal(false);
                                updateNotif(empty);
                            } else if (notif.type == 'GAME') {
                                console.log('Game found');
                                setRedirected(true);
                            }
                            deleteNotif({ id: notif.id });
                        }}
                    >
                        <img src="/images/accept.svg" alt="" className="w-6 h-6" />
                    </button>
                    <button
                        className="flex justify-center items-center col-span-1 bg-red-400 w-1/2 h-6 m-auto rounded-full "
                        type="button"
                        name="Decline"
                        title="Decline"
                        onClick={() => {
                            //Decline
                            declineNotif(true);
                            deleteNotif({ id: notif.id });
                            updateModal(false);
                            updateNotif(empty);
                        }}
                    >
                        <img src="/images/decline.svg" alt="" className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <button
                key={notif.id}
                className="w-8 h-8 rounded-full absolute right-1 top-1 z-20 flex justify-center items-center"
                onClick={() => {
                    updateModal(false);
                    updateNotif(empty);
                }}
                type="button"
                name="Decline"
                title="Decline"
            >
                <GiCancel className="w-full h-full text-red-500" />
            </button>
        </div>
    );
}
