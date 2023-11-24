'use client';

import Loading from '@/app/loading';
import { useSocket } from '@/contexts/SocketContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import Notification from './Notifications';
import { NotificationProps } from './types';

export default function Page() {
    const queryClient = useQueryClient();

    const { socket } = useSocket();
    useEffect(() => {
        socket?.on('notifications', () => {
            console.log('connect');
            setTimeout(() => {
                queryClient.invalidateQueries(['notifications']);
            }, 100);
        });
        return () => {
            socket?.off('notifications');
            console.log('disconnect');
        };
    }, [queryClient, socket]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/notifications/me`, {
                withCredentials: true,
            });
            return data;
        },
    });

    if (isError) {
        redirect('/signin');
    }
    if (isLoading) {
        return <Loading />;
    }
    console.log('the notif is:', data);
    const notifications = data.map(
        (notification: any) =>
            ({
                id: notification.id,
                username: notification.user.username,
                avatar: notification.user.avatar,
                readed: notification.readed,
                type: notification.type,
                sendToId: notification.sendToId,
                ChallengeId: notification.ChallengeId,
            }) as NotificationProps,
    );
    return (
        <div id="Notification" className="overflow-hidden">
            <Notification notifications={notifications} />
        </div>
    );
}
