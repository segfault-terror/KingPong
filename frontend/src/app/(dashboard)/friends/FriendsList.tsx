import { Friend, UserStatus, FriendState } from './types';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Ghost from '@/components/Ghost';

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

const FriendCard = ({ name, avatar, status }: Friend) => {
    const handlClick = (username: string) => {
        redirect('/profile');
    };
    let colorStus =
        status === UserStatus.Online ? 'bg-green-500' : 'bg-red-500';
    colorStus = status === UserStatus.InGame ? 'bg-yellow-500' : colorStus;

    const bgStatus =
        status === UserStatus.Offline ? 'bg-inactive-500' : 'bg-primary';
    return (
        <Link
            className={`flex flex-row items-center justify-between w-full p-3 md:p-6 z-10 rounded-xl my-[2px] ${bgStatus} hover:bg-background hover:border-r hover:border-l border-secondary-200 delay-75 duration-75 transition `}
            href={`/profile/${name}`}
        >
            <div className="flex flex-row items-center justify-start">
                <img
                    src={avatar}
                    alt="avatar"
                    className="w-24 rounded-full bg-background"
                />
                <div className="flex flex-col items-start justify-center ml-3">
                    <span className="text-lg font-medium">{name}</span>
                    <span
                        className={`text-sm font-medium rounded-full px-2 py-1 ${colorStus} text-white`}
                    >
                        {status}
                    </span>
                </div>
            </div>
            <button className="bg-background text-white rounded-full px-3 py-1 text-sm font-medium hover:bg-secondary-200 hover:text-black">
                Message
            </button>
        </Link>
    );
};

export default function FriendsList({ friends }: FriendState) {
    return (
        <div className="felx flex-col justify-center items-center w-full p-3 md:p-6 z-0 mt-3 md:mt-0 lg:max-w-5xl lg:mx-auto ">
            <div className="flex flex-col justify-center items-center bg-gradient-radial from-primary to-background rounded-xl border-secondary-500 border drop-shadow-[0px_0px_3px_#ffA21A] px-3 pt-1 m-auto relative">
                {friends.length === 0
                    ? EmptyFriendsList()
                    : friends.map(
                          (friend) =>
                              friend.status !== UserStatus.Offline && (
                                  <FriendCard key={friend.id} {...friend} />
                              ),
                      )}
                {friends.map(
                    (friend) =>
                        friend.status === UserStatus.Offline && (
                            <FriendCard key={friend.id} {...friend} />
                        ),
                )}
                <div className=" w-5/6 h-4/5 rounded-xl bg-gray-500 absolute z-0 flex flex-col justify-center items-center"></div>
            </div>
        </div>
    );
}
