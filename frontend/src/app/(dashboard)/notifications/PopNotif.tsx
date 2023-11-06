import React, { useEffect, useState } from 'react';
import { NotificationProps } from './types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import LoadingEmpty from './EmptyLoading';
import { useSocket } from '@/contexts/SocketContext';
import { set } from 'react-hook-form';

const empty: NotificationProps = {
    id: 0,
    type: 'GAME',
    readed: false,
    username: '',
    avatar: '',
    sendToId: '',
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

    const { mutate: acceptFriend, isLoading: acceptLoading, isSuccess } = useMutation({
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

    const {data: me, isLoading: meLoading} = useQuery(['me'], async () => {
        const res = await axios.get('/api/users/me', {
            withCredentials: true,
        });
        return res.data;
    });
    const {socket} = useSocket();

    if (deleteLoading || acceptLoading || meLoading) return <LoadingEmpty />;

    return (
        <div
            key={notif.id}
            className="flex justify-center items-center relative w-full h-full"
        >
            <div className="flex flex-col justify-center items-center absolute inset-0 z-20 opacity-10">
                <img src={bgImage} alt="" className="w-2/3 h-2/3" />
            </div>
            <div className="w-full h-full flex flex-col justify-between items-center bg-gradient-radial from-primary to-background rounded-lg border border-secondary-500">
                <div className="flex flex-col justify-between items-center m-auto z-30">
                    <img
                        src={notif.avatar}
                        alt=""
                        className="w-24 h-24 md:h-32 md:w-32 lg:h-44 lg:w-44 border-white border rounded-full mr-2 bg-background object-cover"
                    />
                    <p className="flex justify-center items-center mx-2 text:md lg:text-2xl align-middle text-clip">
                        {message}
                    </p>
                </div>
                <div className="grid grid-cols-2 w-full z-30">
                    <button
                        className="flex justify-center items-center col-span-1 bg-green-400 w-1/2 h-6 m-auto rounded-lg"
                        type="button"
                        name="Accept"
                        title="Accept"
                        onClick={() => {
                            if (notif.type == 'FRIEND') {
                                console.log('me: ', me, {sender: notif.username, receiver: me.username});
                                socket?.emit('profile', {user1: me.username, user2: notif.username});
                                acceptFriend({ username: notif.username });
                            }
                            deleteNotif({ id: notif.id });
                            updateModal(false);
                            updateNotif(empty);
                        }}
                    >
                        <img src="/images/accept.svg" alt="" className="" />
                    </button>
                    <button
                        className="flex justify-center items-center col-span-1 bg-red-400 w-1/2 h-6 m-auto rounded-lg"
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
                        <img src="/images/decline.svg" alt="" className="" />
                    </button>
                </div>
            </div>
            <button
                key={notif.id}
                className="w-10 h-10 rounded-full absolute right-0 top-0 z-20 flex justify-center items-center"
                onClick={() => {
                    updateModal(false);
                    updateNotif(empty);
                }}
                type="button"
                name="Decline"
                title="Decline"
            >
                <img src="/images/decline.svg" alt="Decline"></img>
            </button>
        </div>
    );
}
