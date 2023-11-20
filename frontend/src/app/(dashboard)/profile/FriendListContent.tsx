import Loading from '@/app/loading';
import { useSocket } from '@/contexts/SocketContext';
import useInvite from '@/hooks/useInvite';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

type FriendListContentProps = {
    username: string;
    status: string;
    avatar: string;
};

export default function FriendListContent({
    username,
    status,
    avatar,
}: FriendListContentProps) {
    const { data, isLoading } = useQuery({
        queryKey: ['isFriend', username],
        queryFn: async () => {
            const res = await axios.get(`/api/user/isFriend/${username}`, {
                withCredentials: true,
            });
            return res.data;
        },
    });
    const [showNotification, setShowNotification] = useState(false);

    const { mutate: InviteFriend } = useInvite();
    const { socket } = useSocket();

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    let statusBg;
    let statusText;

    if (status === 'ONLINE') {
        statusBg = 'bg-online';
        statusText = 'text-online';
    } else if (status === 'OFFLINE') {
        statusBg = 'bg-silver';
        statusText = 'text-silver';
    } else {
        statusBg = 'bg-ingame';
        statusText = 'text-ingame';
    }

    return (
        <>
            {showNotification && (
                <motion.div
                    className="absolute
                                top-44 md:top-32 lg:top-52
                                right-4
                                bg-green-400 text-primary
                                text-center font-jost
                                px-4 py-2 rounded-xl
                                flex gap-2 items-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: 0,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                >
                    <AiOutlineCheckCircle className="text-xl font-bold" />
                    <p>Friend request sent successfully</p>
                </motion.div>
            )}
            <div className="flex items-center gap-8">
                <Link href={`/profile/${username}`} className="flex-shrink-0">
                    <img
                        src={avatar}
                        alt={`${username}`}
                        className="w-24 h-24
						bg-background border-2 border-background
						rounded-full select-none object-cover"
                    />
                </Link>
                <div className="flex flex-col items-start gap-1">
                    <Link
                        href={`/profile/${username}`}
                        className="text-secondary-200 text-xl
							font-jost font-bold"
                    >
                        {username}
                    </Link>
                    <p
                        className={`${statusText} flex items-center justify-center gap-1`}
                    >
                        <span
                            className={`block w-[12px] h-[12px] ${statusBg} rounded-full`}
                        />
                        {status.toLowerCase()}
                    </p>

                    {data.isFriend ? (
                        <Link
                            href={`/chat/dm/${username}`}
                            className="bg-background rounded-2xl px-4
						border border-white
						text-secondary-200 font-jost hover:bg-secondary-200 hover:text-background"
                        >
                            Message
                        </Link>
                    ) : data.isMe ? null : (
                        <button
                            className="bg-background rounded-2xl px-4
						border border-white
						text-secondary-200 font-jost hover:bg-secondary-200 hover:text-background"
                            onClick={() => {
                                // console.log(data)
                                InviteFriend({
                                    id: data.friendId,
                                    type: 'FRIEND',
                                });
                                socket?.emit('notifications', username);
                                setShowNotification(true);
                                setTimeout(
                                    () => setShowNotification(false),
                                    2000,
                                );
                            }}
                        >
                            Invite
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
