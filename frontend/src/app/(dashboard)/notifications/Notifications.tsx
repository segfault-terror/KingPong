'use client';

import Image from 'next/image';
import Ghost from '../../../components/Ghost';
import React, { useCallback, useEffect, useState } from 'react';
import Decline from '@/../public/images/decline.svg';
import Modal from '@/components/Modal';
import PopNotif from './PopNotif';
import { NotificationProps, NotificationState } from './types';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from '@/app/loading';

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

const Notife = ({
    id,
    type,
    username,
    avatar,
    readed,
    senderId,
    setIsOpen,
    setNotif,
}: NotificationProps & {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNotif: React.Dispatch<React.SetStateAction<NotificationProps>>;
}) => {
    const queryClient = useQueryClient();
    const { mutate: update, isLoading: updateLoading } = useMutation({
        mutationFn: async (data: any) => {
            return await axios.post(`/api/notifications/update`, data, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            console.log('updated');
            queryClient.invalidateQueries(['notifications'], {
                exact: true,
            });
        },
    });

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

    if (deleteLoading || updateLoading) return <Loading />;

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
                className="flex justify-stretch items-center w-full h-full cursor-pointer"
                onClick={() => {
                    if (readed == false) update({ id, type, readed: true });
                    setIsOpen(true);
                    setNotif({ id, type, username, avatar, readed, senderId });
                }}
            >
                <img
                    src={avatar}
                    alt="image"
                    className="w-20 h-20 rounded-full border-white border m-2 object-cover self-start"
                />
                <div className="font-jost text-white text-md sm:text-lg md:text-xl m-auto">
                    {message}
                </div>
            </div>
            <img src={image} alt="fight" className="w-12 px-1" />
            <button
                className="px-2"
                type="button"
                name="Decline"
                title="Decline"
                onClick={() => {
                    deleteNotif({ id });
                }}
            >
                <Image src={Decline} alt="Decline"></Image>
            </button>
        </div>
    );
};
export default function Notification({ notifications }: NotificationState) {
    const [isOpen, setIsOpen] = useState(false);
    const [notif, setNotif] = useState<NotificationProps>({
        id: 0,
        type: 'GAME',
        readed: false,
        username: '',
        avatar: '',
        senderId: ""
    });

    return (
        <div
            id="Notifications"
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
                                  <Notife
                                      id={notifs.id}
                                      username={notifs.username}
                                      avatar={notifs.avatar}
                                      readed={notifs.readed}
                                      type={notifs.type}
                                      setIsOpen={setIsOpen}
                                      setNotif={setNotif}
                                      senderId={notifs.senderId}
                                  />
                                  {isOpen && (
                                      <Modal
                                          childrenClassName="flex flex-col justify-center items-center w-72 h-56 md:w-1/2  lg:w-2/5 lg:h-1/4"
                                          onClose={() => {
                                              setIsOpen(false);
                                          }}
                                      >
                                          <PopNotif
                                              notif={notif}
                                              updateModal={setIsOpen}
                                              updateNotif={setNotif}
                                          />
                                      </Modal>
                                  )}
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
}
