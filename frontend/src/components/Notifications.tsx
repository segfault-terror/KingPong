import Header from '@/app/(dashboard)/Header';
import Image from 'next/image';

import Decline from '@/../public/images/decline.svg';
const Cross = () => {
    return (
        <Image src={Decline} alt="Decline">
        </Image>
    )
}

type User = {
    name: string;
    image: string;
};

type NotificationProps = {
    type: 'Game' | 'friend';
    sender: User;
};

type NotificationState = {
    notification: NotificationProps[];
};

const Notife = (type: string, sender: string) => {
    if (type == 'Game')
        return (
            <div className="flex justify-start items-center h-24 w-full my-1 bg-black">
                <div className="font-jost text-white">
                    {`${sender} has invited you to a game!`}
                    <img src="/images/fight.svg" alt="fight" className=''  />
                </div>
            </div>
        );
    else if (type == 'friend') {
        return (
            <div className="flex justify-start items-center h-24 w-full my-1 bg-black">
                <p className="font-jost text-white">
                    {`${sender} has sent you a friend request!`}
                </p>
            </div>
        );
    }
};

export default function Notification({ notification }: NotificationState) {
    return (
        <div className="min-h-screen">
            <Header />
            <div className="mt-2 flex flex-col justify-center items-center content-center">
                {notification.length > 0 ? (
                    <>
                        {notification.map((notif) => (
                            <div
                                key={`${notif.type}-${notif.sender.name}`}
                                className="flex justify-around items-center h-24 w-full my-1 bg-black"
                            >
                                <div className="h-24 w-24 bg-slate-400 rounded-full mx-1">
                                    <img
                                        src={notif.sender.image}
                                        alt={notif.sender.name}
                                    />
                                </div>
                                <div>{Notife(notif.type, notif.sender.name)}</div>
                                <button className='sm:w-4'>{Cross()}</button>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>No notifications to display.</p>
                )}
            </div>
        </div>
    );
}
