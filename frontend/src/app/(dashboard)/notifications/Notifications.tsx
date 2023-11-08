'use client';

import Image from 'next/image';
import Ghost from '../../../components/Ghost';
import React, { useEffect, useState } from 'react';
import Decline from '@/../public/images/decline.svg';
import Modal from '@/components/Modal';
import PopNotif from './PopNotif';
import { NotificationProps, NotificationState } from './types';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingEmpty from './EmptyLoading';
import { useSocket } from '@/contexts/SocketContext';

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
    sendToId,
    setIsOpen,
    setNotif,
}: NotificationProps & {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNotif: React.Dispatch<React.SetStateAction<NotificationProps>>;
}) => {
    const queryClient = useQueryClient();
    const { data: meData, isLoading: isloadingMe } = useQuery(
        ['me'],
        async () => {
            const { data } = await axios.get(`/api/user/me`, {
                withCredentials: true,
            });
            return data;
        },
    );
    const {
        mutate: update,
        isLoading: updateLoading,
        isSuccess: SuccessUpdate,
    } = useMutation({
        mutationFn: async (data: any) => {
            return await axios.post(`/api/notifications/update`, data, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            console.log('updated');

            queryClient.invalidateQueries(['notreaded']);
            queryClient.invalidateQueries(['notifications']);
        },
    });
    const {
        mutate: deleteNotif,
        isLoading: deleteLoading,
        isSuccess: SuccessDelete,
    } = useMutation({
        mutationFn: async (data: any) => {
            return await axios.delete(`/api/notifications/delete`, {
                data,
                withCredentials: true,
            });
        },
        onSuccess: () => {
            console.log('deleted');
            queryClient.invalidateQueries(['notifications']);
        },
    });
    const { socket } = useSocket();
    useEffect(() => {
        if (!isloadingMe) socket?.emit('notifications', meData.username);
    }, [SuccessDelete, SuccessUpdate]);

    if (deleteLoading || updateLoading) return <LoadingEmpty />;

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
                    setNotif({ id, type, username, avatar, readed, sendToId });
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
    const { data: meData, isLoading: isloadingMe } = useQuery(
        ['me'],
        async () => {
            const { data } = await axios.get(`/api/user/me`, {
                withCredentials: true,
            });
            return data;
        },
    );
    const queryClient = useQueryClient();
    const {
        mutate: clear,
        isLoading,
        isSuccess,
    } = useMutation({
        mutationFn: async () => {
            return await axios.delete(`/api/notifications/delete/all`, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications']);
        },
    });
    const { socket } = useSocket();
    
    const [isOpen, setIsOpen] = useState(false);
    const [deleteNotif, setDeleteNotif] = useState(false);
    const [acceptNewFriend, setAcceptNewFriend] = useState(false);
    const [notif, setNotif] = useState<NotificationProps>({
        id: 0,
        type: 'GAME',
        readed: false,
        username: '',
        avatar: '',
        sendToId: '',
    });
    const [deleteAll, setDeleteAll] = useState(false);

    useEffect(() => {
        if (!isloadingMe)
            console.log('useEffect: notifications', meData.username);
        if (!isloadingMe) socket?.emit('notifications', meData.username);
        if (!isloadingMe && acceptNewFriend)
        {
            console.log('acceptNewFriend: ', meData.username);
            socket?.emit('friends', meData.username);
            setAcceptNewFriend(false);
        }
    }, [isSuccess, deleteNotif, acceptNewFriend]);

    const modal = () => {
        return (
            <Modal
                childrenClassName="flex flex-col justify-center items-center w-64 h-40"
                onClose={() => {
                    setDeleteAll(false);
                }}
            >
                <div className="w-64 h-40 bg-background rounded-2xl flex flex-col justify-start items-center">
                    <div className="text-center p-7 font-jost">
                        <p>Are sure you want remove all</p>
                        <p className="text-red-500">&nbsp; notifications</p>
                    </div>
                    <button
                        type="button"
                        title="clear"
                        className="w-20 h-6 border text-center bg-red-500 border-secondary-500 rounded-lg self-center"
                        onClick={() => {
                            setDeleteAll(false);
                            clear();
                        }}
                    >
                        Clear
                    </button>
                    <button
                        className="absolute top-2 right-2 w-5 h-5"
                        type="button"
                        title="close"
                        onClick={() => {
                            setDeleteAll(false);
                        }}
                    >
                        <Image src={Decline} alt="Decline"></Image>
                    </button>
                </div>
            </Modal>
        );
    };

    if (isLoading) {
        // setLoading(true);
        return <LoadingEmpty />;
    }

    return (
        <>
            {deleteAll === true ? modal() : null}
            <div
                id="Notifications"
                className="felx flex-col justify-center items-center w-full p-3 md:p-6 z-0 mt-3 md:mt-0 overflow-x-hidden"
            >
                <div className="flex flex-col justify-center items-center w-ful lg:max-w-3xl lg:mx-auto pl-4 py-2 px-3 bg-primary border rounded-lg border-secondary-500 drop-shadow-neon-orange">
                    {notifications.length > 0 && (
                        <button
                            type="button"
                            title="clear"
                            className="w-20 h-6 border text-center bg-background border-secondary-500 rounded-lg self-end mr-3"
                            onClick={() => {
                                setDeleteAll(true);
                            }}
                        >
                            Clear
                        </button>
                    )}
                    <div className="flex flex-col justify-between items-center w-full lg:px-3 overflow-hidden">
                        {notifications.length == 0
                            ? Empty()
                            : notifications.map((notifs) => (
                                  <div
                                      className={`w-full flex justify-between items-center my-1 rounded-xl overflow-x-hidden`}
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
                                          sendToId={notifs.sendToId}
                                      />
                                      {isOpen && (
                                          <Modal
                                              childrenClassName="flex flex-col justify-center items-center w-72 h-56 md:w-[400px]  lg:w-[500px] lg:h-96"
                                              onClose={() => {
                                                  setIsOpen(false);
                                              }}
                                          >
                                              <PopNotif
                                                  notif={notif}
                                                  updateModal={setIsOpen}
                                                  updateNotif={setNotif}
                                                  declineNotif={setDeleteNotif}
                                                  acceptNewFriend={setAcceptNewFriend}
                                              />
                                          </Modal>
                                      )}
                                  </div>
                              ))}
                    </div>
                </div>
            </div>
        </>
    );
}
