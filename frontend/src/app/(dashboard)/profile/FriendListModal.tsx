import Link from 'next/link';
import { Users, UsersFriends } from './data/ProfileData';
import UserCircleInfo from './UserCircleInfo';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type FriendListModalProps = {
    userName: string;
};

export default function FriendListModal({ userName }: FriendListModalProps) {
    const { data: user, isLoading } = useQuery({
        queryKey: ['userFriends', userName],
        queryFn: async () => {
            const user = await axios.get(
                `http://localhost:3000/user/get/${userName}/friends`,
                { withCredentials: true },
            );
            return user.data;
        },
    });

    return (
        <div className="flex flex-col gap-4">
            {user?.friends.map((friend: any, idx: number) => {
                return (
                    <div key={idx} className="font-jost">
                        <Link href={`/profile/${friend?.username}`}>
                            <div className="flex flex-row gap-4 items-center hover:bg-primary hover:rounded-full">
                                <UserCircleInfo username={friend?.username} />
                                <div className="text-xl">
                                    <p>{friend?.fullname}</p>
                                    <p className="italic text-secondary-200">
                                        @{friend?.username}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
