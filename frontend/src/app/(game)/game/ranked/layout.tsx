'use client';
import Loading from '@/app/loading';
import { SocketProvider } from '@/contexts/SocketContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { redirect } from 'next/navigation';

import { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    const { error, data } = useQuery({
        queryKey: ['auth'],
        queryFn: async () => {
            try {
                return await axios.get(`/api/auth/status`, {
                    withCredentials: true,
                });
            } catch {
                redirect('/signin');
            }
        },
        refetchOnWindowFocus: false,
    });

    const {
        data: me,
        isLoading: meLoading,
        isError,
    } = useQuery(['me'], async () => {
        try {
            const { data } = await axios.get(`/api/user/get/stats/me`, {
                withCredentials: true,
            });
            return data;
        } catch {
            redirect('/signin');
        }
    });

    if (error || data?.data.status === false) {
        redirect('/signin');
    }

    if (meLoading) return <Loading />;

    return (
        <>
            <SocketProvider namespace="game" username={me.username}>
                {children}
            </SocketProvider>
        </>
    );
}
