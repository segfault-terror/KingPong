import Link from 'next/link';
import { Users, UsersFriends } from './data/ProfileData';
import UserCircleInfo from './UserCircleInfo';

type FriendListModalProps = {
    userName: string;
};

export default function FriendListModal({ userName }: FriendListModalProps) {
    const userFriends = UsersFriends.find(
        (friend) => friend.username === userName,
    )!.friendList;

    return (
        <div className="flex flex-col gap-4">
            {userFriends.map((friendName, idx) => {
                const { fullname } = Users.find(
                    (user) => user.username === friendName,
                )!;
                return (
                    <div key={idx} className="font-jost">
                        <Link href={`/profile/${friendName}`}>
                            <div className="flex flex-row gap-4 items-center hover:bg-primary hover:rounded-full">
                                <UserCircleInfo username={friendName} />
                                <div className="text-xl">
                                    <p>{fullname}</p>
                                    <p className="italic text-secondary-200">
                                        @{friendName}
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
