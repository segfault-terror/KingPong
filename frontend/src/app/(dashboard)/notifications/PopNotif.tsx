import React from 'react';
import { NotificationProps } from './types';
import Image from 'next/image';
import Decline from '../../../../public/images/decline.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const empty: NotificationProps = {
    id: 0,
    type: 'GAME',
    readed: false,
    username: '',
    avatar: '',
};

export default function PopNotif({
    notif,
    updateModal,
    updateNotif,
}: {
    notif: NotificationProps;
    updateModal: Function;
    updateNotif: Function;
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
                            //Add to friends
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
