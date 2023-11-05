'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import AchievementList from '../AchievementList';
import FullFriendList from '../FullFriendList';
import MatchHistory from '../MatchHistory';
import ProfileCard from '../ProfileCard';
import axios from 'axios';
import Loading from '@/app/loading';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';

type ProfilePageProps = {
    params: {
        username: string;
    };
};

export default function ProfilePage({ params }: ProfilePageProps) {
    const { data, isLoading } = useQuery({
        queryKey: ['user', params.username],
        queryFn: async () => {
            const { data } = await axios.get(
                `/api/user/get/${params.username}`,
                {
                    withCredentials: true,
                },
            );
            return data;
        },
    });

    const {socket } = useSocket();
    const queryClient = useQueryClient();
    useEffect(() => {
        socket?.on('profile', () => {
            console.log('profile on');
            queryClient.invalidateQueries(['profile', params.username], {
                exact: true,
            });
            queryClient.invalidateQueries(['isFriend', params.username], {
                exact: true,
            });
            queryClient.invalidateQueries(['userFriends', params.username], {
                exact: true,
            });
        });

        return () => {
            socket?.off('profile');
        };
    }, [socket]);

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    if (!data) {
        redirect('/not-found');
    }

    return (
        <>
            <div
                className="flex flex-col gap-2 mx-4 mt-20 mb-8
                            md:grid md:grid-cols-4 md:gap-3
                            lg:grid-cols-3
                            lg:max-w-5xl lg:mx-auto lg:my-40"
            >
                <div className="md:col-span-full">
                    <ProfileCard username={params.username} />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                    <AchievementList username={params.username} />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                    <FullFriendList username={params.username} />
                </div>
                <div className="md:col-start-2 md:col-end-4 lg:col-span-1">
                    <MatchHistory username={params.username} />
                </div>
            </div>
        </>
    );
}
