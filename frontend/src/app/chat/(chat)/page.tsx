'use client';

import { useContext } from 'react';
import ChatSideBar from '../ChatSideBar';
import { toggleContext } from '@/contexts/contexts';
import { SocketProvider } from '@/contexts/SocketContext';
import axios from 'axios';
import Loading from '@/app/loading';
import { useQuery } from '@tanstack/react-query';

export default function ChatPage() {
    const { toggle, setToggle } = useContext(toggleContext);
    const { data: me, isLoading } = useQuery({
        queryKey: ['user', 'me'],
        queryFn: async () => {
            const { data } = await axios.get('/api/user/me');
            return data;
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
        <SocketProvider username={me.username}>
            <ChatSideBar toggle={toggle} setToggle={setToggle} />
        </SocketProvider>
    );
}
