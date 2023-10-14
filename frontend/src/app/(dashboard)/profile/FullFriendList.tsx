'use client';
import Lottie from 'lottie-react';
import Ghost from '../../../../public/lottie/ghost.json';
import UserCircleInfo from './UserCircleInfo';
import { UsersFriends } from './data/ProfileData';
import Link from 'next/link';

type FullFriendListProps = {
    username: string;
};

export default function FullFriendList({ username }: FullFriendListProps) {
    const userFriends = UsersFriends.find(
        (friend) => friend.username === username,
    )!.friendList;

    if (userFriends!.length > 3) {
        throw new Error('FullFriendList can only display 3 friends');
    }

    if (userFriends!.length === 0) {
        return (
            <div
                className="bg-primary rounded-2xl
                        flex flex-col items-center justify-center
                        py-2 h-full
                        border-2 border-secondary-200"
            >
                <div className="w-[30%]">
                    <Lottie animationData={Ghost} loop={true} />
                </div>
                <p className="text-gray-400">
                    No friends, your friend list is empty!
                </p>
            </div>
        );
    }

    return (
        <div
            className="md:h-full
                        flex flex-col justify-between
                        bg-primary
                        rounded-2xl
                        border-2 border-secondary-200"
        >
            <div
                className="flex justify-evenly py-4
                            md:grid md:grid-cols-2 md:justify-items-center md:gap-4"
            >
                {userFriends!.map((friendName, idx) => {
                    return (
                        <Link key={idx} href={`/profile/${friendName}`}>
                            <UserCircleInfo username={friendName} />
                        </Link>
                    );
                })}
            </div>
            <button
                className="flex items-center justify-center
                    text-sm text-white
                    bg-gradient-to-t from-[#881EDF] to-secondary-200
                    w-full h-8
                    rounded-b-2xl"
                onClick={() => console.log('See all friends clicked!')}
            >
                Full Friend List
            </button>
        </div>
    );
}
