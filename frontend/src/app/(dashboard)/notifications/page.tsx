'use client';

import Notification from './Notifications';
import { NotificationProps, NotificationState } from './types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/app/loading';
import { redirect } from 'next/navigation';

export default function Page() {
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
    const notifications = data.map(
        (notification: any) =>
            ({
                id: notification.id,
                username: notification.user.username,
                avatar: notification.user.avatar,
                readed: notification.readed,
                type: notification.type,
                sendToId: notification.sendToId,
            }) as NotificationProps,
    );
    return (
        <div id="Notification" className='overflow-hidden'>
            <Notification notifications={notifications} />
        </div>
    );
}
