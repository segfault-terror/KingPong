'use client';
import Lottie from 'lottie-react';
import Ghost from '../../../../public/lottie/ghost.json';
import UserCircleInfo from './UserCircleInfo';
import { UsersFriends } from './data/ProfileData';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { backendHost } from '@/app/globals';

type FullFriendListProps = {
    username: string;
};

export default function FullFriendList({ username }: FullFriendListProps) {
    const { data: user, isLoading } = useQuery({
        queryKey: ['userFriends', username],
        queryFn: async () => {
            const user = await axios.get(
                `${backendHost}/user/get/${username}/friends`,
                { withCredentials: true },
            );
            return user.data;
        },
    });

    if (isLoading) return <div>Loading...</div>;
    const slicedFriends = user?.friends.slice(0, 3);

    if (user?.friends.length === 0) {
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
                {slicedFriends.map((friend: any, idx: number) => {
                    return (
                        <Link key={idx} href={`/profile/${friend?.username}`}>
                            <UserCircleInfo username={friend?.username} />
                        </Link>
                    );
                })}
            </div>

            {user?.friends.length > 3 && (
                <Link
                href={`/friends`}
                    className="flex items-center justify-center
                    text-sm text-white
                    bg-gradient-to-t from-[#881EDF] to-secondary-200
                    w-full h-8
                    rounded-b-2xl"
                >
                    Full Friend List
                </Link>
            )}
        </div>
    );
}
