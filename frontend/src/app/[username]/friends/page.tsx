'use client';
import { useQuery } from '@tanstack/react-query';
import FriendsList from './FriendsList';
import axios from 'axios';
import Headers from '@/app/(dashboard)/Header';


export default function FriendsPage({params}: { params: {username: string} }) {
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
    if (friendsLoading) return <div>Loading...</div>;

    

    return (
        <main className='flex flex-col'>
            <Headers />
            <FriendsList friends={friends.friends} />
        </main>
    );
}
