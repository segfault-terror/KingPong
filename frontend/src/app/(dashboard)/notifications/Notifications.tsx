'use client';

import Image from 'next/image';
import Ghost from '../../../components/Ghost';
import React from 'react';

import Decline from '@/../public/images/decline.svg';
import Modal from 'react-modal';

Modal.setAppElement('#Notification');

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
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const empty = Empty();
    const [notif, setNotif] = React.useState<NotificationProps>(
        empty.props.children,
    );

    const PopNotif = ({ notif }: { notif: NotificationProps }) => {
        const message =
            notif.type == 'Game'
                ? `${notif.sender.name} has invited you to a game!`
                : `${notif.sender.name} has sent you a friend request!`;
        return (
            <div
                key={notif.id}
                className="flex justify-center items-center relative w-full h-full"
            >
                <div className="flex flex-col justify-center items-center absolute inset-0 z-0 opacity-30">
                    <img src="/images/fight.svg" alt="" />
                </div>
                <div className="w-full h-full flex flex-col justify-between items-center bg-gradient-radial from-primary to-background rounded-lg border border-secondary-500 z-10">
                    <div className="flex flex-col justify-between items-center m-auto">
                        <img
                            src={notif.sender.image}
                            alt=""
                            className=" w-2/6 border-white border rounded-full p-1 mr-2 "
                        />
                        <p className="flex justify-center items-center mx-2">
                            {notif.sender.name} {message}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 w-full">
                        <button
                            className='flex justify-center items-center col-span-1 bg-green-400 w-1/3 h-6 m-auto rounded-lg'
                            type="button"
                            name="Accept"
                            title="Accept"
                        >
                            <img src="/images/accept.svg" alt=""  className=''/>
                        </button>
                        <button
                            className="flex justify-center items-center col-span-1 bg-red-400 w-1/3 h-6 m-auto rounded-lg"
                            type="button"
                            name="Decline"
                            title="Decline"
                        >
                            <img src="/images/decline.svg" alt="" className=''/>
                        </button>
                    </div>
                </div>
                <button
                    key={notif.id}
                    className="w-10 h-10 rounded-full absolute right-0 top-0 z-20 flex justify-center items-center"
                    onClick={() => {
                        setIsOpen(false);
                        // setNotif(empty.props);
                    }}
                    type="button"
                    name="Decline"
                    title="Decline"
                >
                    <img src="/images/decline.svg" alt="Decline"></img>
                </button>
            </div>
        );
    };

    const Notife = ({ id, type, sender, readed }: NotificationProps) => {
        const message =
            type == 'Game'
                ? `${sender.name} has invited you to a game!`
                : `${sender.name} has sent you a friend request!`;
        const image =
            type == 'Game' ? '/images/fight.svg' : '/images/add-friend.svg';
        const color = readed == true ? 'bg-background' : 'bg-amber-500';
        return (
            <div
                className={`flex justify-between items-center h-24 w-full my-1 ${color} rounded-2xl relative`}
            >
                <div
                    className="flex justify-around items-center w-full h-full cursor-pointer"
                    onClick={() => {
                        setIsOpen(true);
                        setNotif({ id, type, sender, readed });
                    }}
                >
                    <img
                        src={sender.image}
                        alt="image"
                        className="w-20 rounded-full border-white border m-2"
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

    return (
        <div
            id="Notification"
            className="felx flex-col justify-center items-center w-full p-3 md:p-6 z-0"
        >
            <div className="flex justify-center items-center w-ful lg:max-w-3xl lg:mx-auto pl-4 py-2 px-3 bg-primary border rounded-lg border-secondary-500 drop-shadow-neon-orange">
                <div className="flex flex-col justify-between items-center w-full lg:px-3 overflow-auto">
                    {notification.length == 0
                        ? Empty()
                        : notification.map((notifs) => (
                              <div
                                  className="w-full flex justify-between items-center my-1 rounded-xl"
                                  key={notifs.id}
                              >
                                  {Notife(notifs)}
                                  <Modal
                                      key={notifs.id}
                                      appElement={
                                          typeof document !== 'undefined'
                                              ? document.body
                                              : undefined
                                      }
                                      isOpen={modalIsOpen}
                                      onRequestClose={() => setIsOpen(false)}
                                      className={`flex flex-col absolute inset-0 justify-center items-center w-5/6 h-48 md:w-1/2 md:h-1/2`}
                                      style={{
                                          overlay: {
                                              background: 'rgba(0,0,0,0.1)',
                                              backgroundBlendMode: 'lighten',
                                          },
                                          content: {
                                              margin: 'auto',
                                          },
                                      }}
                                  >
                                      <PopNotif notif={notif} />
                                  </Modal>
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
}
