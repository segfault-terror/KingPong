'use client';
import { useQuery } from '@tanstack/react-query';
import FriendsList from './FriendsList';
import axios from 'axios';

export default function FriendsPage() {
    const { data: user, isLoading: friendsLoading } = useQuery({
        queryKey: ['friends'],
        queryFn: async () => {
            const { data: me } = await axios.get('/api/user/me', {
                withCredentials: true,
            });

            const { data } = await axios.get(
                `/api/user/get/${me.username}/friends`,
                { withCredentials: true },
            );
            return data;
        },
    });

    if (friendsLoading) return <div>Loading...</div>;

    return <FriendsList friends={user.friends} />;
}
