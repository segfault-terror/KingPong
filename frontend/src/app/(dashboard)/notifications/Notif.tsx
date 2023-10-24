import React from 'react';
import Image from 'next/image';
import Decline from '../../../../public/images/decline.svg';
import { NotificationProps } from './types';

const Notife = ({ id, type, username,avatar, readed }: NotificationProps, updateModal: Function, updateNotif: Function) => {
    const message =
        type == 'GAME'
            ? `${username} has invited you to a game!`
            : `${username} has sent you a friend request!`;
    const image =
        type == 'GAME' ? '/images/fight.svg' : '/images/add-friend.svg';
    const color = readed == true ? 'bg-background' : 'bg-amber-500';
    return (
        <div
            className={`flex justify-between items-center h-24 w-full my-1 ${color} rounded-2xl relative`}

        >
            <div
                className="flex justify-around items-center w-full h-full cursor-pointer"
                onClick={() => {
                    updateModal(true);
                    updateNotif({ id, type, username, avatar, readed });
                }}
            >
                <img
                    src={avatar}
                    alt="image"
                    className="w-20 rounded-full border-white border m-2 object-cover"
                />
                <div className="font-jost text-white">{message}</div>
            </div>
            <img src={image} alt="fight" className="w-12 px-1" />
            <button
                className="px-2"
                type="button"
                name="Decline"
                title="Decline"
            >
                <Image src={Decline} alt="Decline"></Image>
            </button>
        </div>
    );
};