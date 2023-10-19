'use client';

import Notification from './Notifications';
import { NotificationProps, NotificationState } from './types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/app/loading';
import { useContext } from 'react';
import { backendHost } from '@/app/globals';

export default function Page() {
    const { data, isLoading } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const { data } = await axios.get(`${backendHost}/notifications`, {
                withCredentials: true,
            });
            return data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }
    const notifications = data.map((notification: any) => ({
        id: notification.id,
        username: notification.user.username,
        avatar: notification.user.avatar,
        readed: notification.readed,
        type: notification.type,
    }) as NotificationProps);
    console.log(notifications);
    return (
        <div id="Notification">
            <Notification notifications={notifications} />
        </div>
    );
}
