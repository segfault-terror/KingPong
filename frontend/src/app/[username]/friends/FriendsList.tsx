'use client';
import Ghost from '@/components/Ghost';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Friend, FriendState, UserStatus } from './types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { stat } from 'fs';
import Loading from '@/app/loading';

const EmptyFriendsList = () => {
    return (
        <div className="relative flex justify-center items-center h-24 w-full my-1 bg-background rounded-2xl z-10">
            <div className=" absolute inset-0 flex flex-col justify-center items-center font-jost text-white">
                No Friends yet
            </div>
            <Ghost className="w-[30%] md:w-[20%] drop-shadow-neon-white" />
        </div>
    );
};

const FriendCard = ({
    username,
    fullname,
    avatar,
    status,
    id,
    isYourFriend,
    isme,
}: Friend) => {
    let colorStus =
        status === UserStatus.Online ? 'bg-green-500' : 'bg-red-500';
    colorStus = status === UserStatus.InGame ? 'bg-yellow-500' : colorStus;

    const bgStatus =
        status === UserStatus.Offline ? 'bg-inactive-500 opacity-50' : '';
    const SendGameReq = status === UserStatus.Online ? true : false;

    return (
        <div
            className={`flex items-center justify-center w-full h-full p-3 z-10 rounded-xl ${bgStatus}  hover:bg-background hover:border-r hover:border-l delay-75 duration-75 transition border`}
            key={id}
        >
            <Link className="flex items-center justify-start w-3/4 h-full "
            href={`/profile/${username}`}>
                <img
                    src={avatar}
                    alt="avatar"
                    className="w-28 h-28 rounded-full bg-background border-white border-2 object-cover"
                />
                <div className="flex flex-col items-start justify-center ml-3">
                    <span className="text-lg font-medium">{fullname}</span>
                    <span
                        className={`text-xs rounded-full px-2 py-1 ${colorStus} text-white`}
                    >
                        {status}
                    </span>
                </div>
            </Link>
            <div className="flex flex-col justify-between w-1/4 h-full  z-30">
                {!isme && (
                    <>
                        {isYourFriend ? (
                            <>
                                <Link
                                    className="bg-background z-20 text-white rounded-full text-center px-3 py-1 text-sm font-medium hover:bg-secondary-200 hover:text-black my-2"
                                    type="submit"
                                    href={`/chat/dm/${username}`}
                                >
                                    Message
                                </Link>
                                {SendGameReq && (
                                    <button
                                        className="bg-background text-white z-20 rounded-full px-3 py-1 text-sm font-medium hover:bg-secondary-200 hover:text-black"
                                        type="button"
                                    >
                                        Challenge
                                    </button>
                                )}
                            </>
                        ) : (
                            //button invite friend
                            <button
                                className="bg-background z-20 text-white rounded-full px-3 py-1 text-sm font-medium hover:bg-secondary-200 hover:text-black"
                                type="button"
                            >
                                Invite
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default function FriendsList({ friends }: FriendState) {
    const {
        data: user,
        isLoading: myloading,
        isError,
        error,
    } = useQuery({
        queryKey: ['friends', 'me'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/user/get/me/friends`, {
                withCredentials: true,
            });
            return data;
        },
    });

    if (myloading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    console.log(user.friends);

    return (
        <div className="felx flex-col justify-center items-center w-full p-3 md:p-6 z-0 mt-3 md:mt-0 lg:max-w-5xl lg:mx-auto ">
            <div className="flex flex-col justify-center items-center bg-gradient-radial from-primary to-background rounded-xl border-secondary-500 border drop-shadow-[0px_0px_3px_#ffA21A] px-3 pt-1 m-auto relative">
                {friends.length === 0
                    ? EmptyFriendsList()
                    : friends.map((friend) => (
                          <div
                              key={friend.id}
                              className="flex flex-col justify-center items-center w-full m-auto h-full"
                          >
                              <FriendCard
                                  isYourFriend={
                                      !!user.friends.find(
                                          (f: any) => f.id === friend.id,
                                      )
                                  }
                                  isme={friend.username === user.username}
                                  id={friend.id}
                                  username={friend.username}
                                  fullname={friend.fullname}
                                  avatar={friend.avatar}
                                  status={friend.status}
                              />
                              <div className=" w-5/6 h-1 rounded-xl bg-gray-500 z-20"></div>
                          </div>
                      ))}
            </div>
        </div>
    );
}
