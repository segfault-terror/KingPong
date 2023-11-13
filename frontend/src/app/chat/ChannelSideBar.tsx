'use client';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../loading';
import { useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';

type ChannelSideBarProps = {
    channelName: string;
};

function Member({
    username,
    avatarPath,
    status,
}: {
    username: string;
    avatarPath: string;
    status: string;
}) {
    const statusStyle =
        status === 'ONLINE'
            ? 'bg-online'
            : status === 'OFFLINE'
            ? 'bg-inactive-200'
            : 'bg-ingame';

    return (
        <Link href={`/profile/${username}`} className="flex items-center gap-2">
            <div className="relative">
                <img
                    src={avatarPath}
                    alt={`${username}'s avatar`}
                    className="border-[1px] border-secondary-200
                        rounded-full object-cover
                        w-10 h-10
                        flex-shrink-0 select-none"
                />
                <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${statusStyle}`}
                />
            </div>
            <p className="text-silver">{username}</p>
        </Link>
    );
}

export default function ChannelSideBar({ channelName }: ChannelSideBarProps) {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    const { data: members, isLoading } = useQuery({
        queryKey: ['channel', channelName, 'members'],
        queryFn: async () => {
            const { data } = await axios.get(
                `/api/chat/channel/${channelName}/members`,
                { withCredentials: true },
            );
            return data;
        },
    });

    useEffect(() => {
        socket?.on('leave-channel', (channelName: string) => {
            queryClient.invalidateQueries(['channel', channelName, 'members'], {
                exact: true,
            });
        });
    }, [members, channelName, socket, queryClient]);

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    return (
        <div
            className="bg-primary border-[1px] border-secondary-200 mx-auto
						rounded-2xl p-8
						text-pink font-jost
                        h-full overflow-y-auto scrollbar-none"
        >
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-center">Owner</h2>
                <Member
                    status={members?.owner.status}
                    username={members?.owner.username}
                    avatarPath={members?.owner.avatar}
                />
                {members?.admins.length > 0 && <h2>Admins</h2>}
                {members?.admins.map((admin: any) => (
                    <Member
                        key={admin.id}
                        status={admin.status}
                        username={admin.username}
                        avatarPath={admin.avatar}
                    />
                ))}
                {members?.members.length > 0 && (
                    <div className="self-start flex flex-col gap-4 mt-6">
                        <h2>Members</h2>
                        {members?.members.map((member: any) => (
                            <Member
                                key={member.id}
                                status={member.status}
                                username={member.username}
                                avatarPath={member.avatar}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
