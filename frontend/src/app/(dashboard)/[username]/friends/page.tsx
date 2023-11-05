'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import FriendsList from './FriendsList';
import axios from 'axios';
import Headers from '@/app/(dashboard)/Header';
import Loading from '@/app/loading';
import { useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';

export default function FriendsPage({
    params,
}: {
    params: { username: string };
}) {
    const { data: friends, isLoading: friendsLoading } = useQuery({
        queryKey: ['friends'],
        queryFn: async () => {
            const { data } = await axios.get(
                `/api/user/get/${params.username}/friends`,
                { withCredentials: true },
            );
            //filter out the current user
            data.friends = data.friends.filter(
                (friend: any) => friend.username !== params.username,
            );
            return data;
        },
    });

    const queryClient = useQueryClient();

    const { socket } = useSocket();
    useEffect(() => {
        socket?.on('friends', () => {
            console.log('friends connect');
            queryClient.invalidateQueries(['friends']);
        });
        return () => {
            socket?.off('friends');
            console.log('friends disconnect');
        };
    }, [socket]);

    if (friendsLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    console.log("hello from friends page");
    return (
        <main className="flex flex-col">
            <FriendsList friends={friends.friends} />
        </main>
    );
}
