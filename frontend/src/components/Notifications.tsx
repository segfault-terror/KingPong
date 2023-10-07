'use client';

import Header from '../app/(dashboard)/Header';
import Image from 'next/image';
import Ghost from '../components/Ghost';

import Decline from '../../public/images/decline.svg';
import { read } from 'fs';

const Cross = () => {
    return;
};

type User = {
    name: string;
    image: string;
};

type NotificationProps = {
    id: number;
    type: 'Game' | 'friend';
    readed: boolean;
    sender: User;
};

type NotificationState = {
    notification: NotificationProps[];
};

const Notife = (type: string, sender: User, readed: boolean = false) => {
    const message =
        type == 'Game'
            ? `${sender.name} has invited you to a game!`
            : `${sender.name} has sent you a friend request!`;
    const image =
        type == 'Game' ? '/images/fight.svg' : '/images/add-friend.svg';
    const color = readed == true ? 'bg-background' : 'bg-amber-500';
    return (
        <div
            className={`flex justify-between items-center h-24 w-full my-1 ${color} rounded-2xl`}
        >
            <img
                src={sender.image}
                alt="image"
                className="w-20 rounded-full border-white border m-2"
            />
            <div className="font-jost text-white">{message}</div>
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

const Empty = () => {
    return (
        <div className="relative flex justify-center items-center h-24 w-full my-1 bg-background rounded-2xl">
            <div className=" absolute inset-0 flex flex-col justify-center items-center font-jost text-white">
                No new notifications
            </div>
            <Ghost className="w-[30%] md:w-[20%] drop-shadow-neon-white" />
        </div>
    );
};

export default function Notification({ notification }: NotificationState) {
    return (
            <div className="felx flex-col justify-center items-center w-full p-3 md:p-6">
                <div className="flex justify-center items-center w-ful lg:max-w-3xl lg:mx-auto pl-4 py-2 px-3 bg-primary border rounded-lg border-secondary-500 drop-shadow-neon-orange">
                    <div className="flex flex-col justify-between items-center w-full lg:px-3 overflow-auto">
                        {notification.length == 0
                            ? Empty()
                            : notification.map((notif) => (
                                  <div className="w-full flex justify-between items-center my-1 rounded-xl">
                                      {Notife(
                                          notif.type,
                                          notif.sender,
                                          notif.readed,
                                      )}
                                  </div>
                              ))}
                    </div>
                </div>
            </div>
    );
}
