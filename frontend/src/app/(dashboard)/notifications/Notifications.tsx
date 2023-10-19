'use client';

import Image from 'next/image';
import Ghost from '../../../components/Ghost';
import React, { useEffect, useState } from 'react';

import Decline from '@/../public/images/decline.svg';
import Modal from 'react-modal';
import PopNotif from './PopNotif';
import { NotificationProps, NotificationState } from './types';

const Empty = () => {
    return (
        <div className="relative flex justify-center items-center h-3/5 w-full my-1 bg-background rounded-2xl">
            <div className=" absolute inset-0 flex flex-col justify-center items-center font-jost text-white">
                No new notifications
            </div>
            <Ghost className="w-[30%] md:w-[20%] drop-shadow-neon-white" />
        </div>
    );
};

const Notife = (
    { id, type, username, avatar, readed }: NotificationProps,
    updateModal: Function,
    updateNotif: Function,
) => {
    console.log(type);
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
                    className="w-20 rounded-full border-white border m-2"
                />
                <div className="font-jost text-white text-md sm:text-lg md:text-xl">
                    {message}
                </div>
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
export default function Notification({ notifications }: NotificationState) {
    useEffect(() => {
        Modal.setAppElement('#Notification');
    }, []);

    const [modalIsOpen, setIsOpen] = useState(false);
    const updateModal = (modal: boolean) => {
        setIsOpen(modal);
    };
    const empty: NotificationProps = {
        id: 0,
        type: 'GAME',
        readed: false,
        username: '',
        avatar: '',
    };
    const [notif, setNotif] = useState<NotificationProps>(empty);

    const updateNotif = (notif: NotificationProps) => {
        setNotif(notif);
    };

    return (
        <div
            id="Notification"
            className="felx flex-col justify-center items-center w-full p-3 md:p-6 z-0 mt-3 md:mt-0 "
        >
            <div className="flex justify-center items-center w-ful lg:max-w-3xl lg:mx-auto pl-4 py-2 px-3 bg-primary border rounded-lg border-secondary-500 drop-shadow-neon-orange">
                <div className="flex flex-col justify-between items-center w-full lg:px-3 overflow-auto">
                    {notifications.length == 0
                        ? Empty()
                        : notifications.map((notifs) => (
                              <div
                                  className="w-full flex justify-between items-center my-1 rounded-xl"
                                  key={notifs.id}
                              >
                                  {Notife(notifs, updateModal, updateNotif)}
                                  <Modal
                                      key={notifs.id}
                                      appElement={
                                          typeof document !== 'undefined'
                                              ? document.body
                                              : undefined
                                      }
                                      isOpen={modalIsOpen}
                                      onRequestClose={() => setIsOpen(false)}
                                      className={`flex flex-col absolute inset-0 justify-center items-center w-5/6 h-48 md:w-1/2  lg:w-2/5 lg:h-1/4`}
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
                                      <PopNotif
                                          notif={notif}
                                          updateModal={updateModal}
                                          updateNotif={updateNotif}
                                      />
                                  </Modal>
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
}
