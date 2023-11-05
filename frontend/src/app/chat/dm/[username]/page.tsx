'use client';

import { SocketProvider } from '@/contexts/SocketContext';
import DmConversation from '../../DmConversation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '@/app/loading';

type UsernameDMProps = {
    params: {
        username: string;
    };
};

export default function UsernameDM({ params }: UsernameDMProps) {
    const { data: me, isLoading } = useQuery({
        queryKey: ['user', 'me'],
        queryFn: async () => {
            const { data: me } = await axios.get('/api/user/me', {
                withCredentials: true,
            });
            return me;
        },
    });

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }
    return (
        <SocketProvider username={me.username} namespace='chat'>
            <DmConversation userName={params.username} />
        </SocketProvider>
    );
}
