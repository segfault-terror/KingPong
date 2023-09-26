'use client';
import Lottie from 'lottie-react';
import Ghost from '../../../public/lottie/ghost.json';
import UserCircleInfo, { UserCircleInfoProps } from './UserCircleInfo';

type FullFriendListProps = {
    lastFriends: UserCircleInfoProps[];
};

export default function FullFriendList({ lastFriends }: FullFriendListProps) {
    if (lastFriends.length > 3) {
        throw new Error('FullFriendList can only display 3 friends');
    }
    if (lastFriends.length === 0) {
        return <div className='bg-primary bg-opacity-80 rounded-2xl
        flex flex-col items-center py-2'>
            <div className='w-[30%]'>
                <Lottie animationData={Ghost} loop={true} autoPlay={true} />
            </div>
            <p className='text-gray-400'>No friends, your friend list is empty!</p>
        </div>
    }

    return (
        <div>
            <div
                className="bg-primary bg-opacity-80 rounded-t-2xl
                    flex justify-evenly py-4"
            >
                {lastFriends.map((friend, idx) => {
                    return <UserCircleInfo key={idx} {...friend} />;
                })}
            </div>
            <div
                className="flex items-center justify-center
                    text-sm text-white
                    bg-gradient-to-t from-[#881EDF] to-secondary-200
                    w-full h-8
                    rounded-b-2xl"
            >
                Full Friend List
            </div>
        </div>
    );
}
