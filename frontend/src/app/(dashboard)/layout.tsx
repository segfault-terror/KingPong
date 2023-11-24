'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Header from './Header';
import axios from 'axios';
import { redirect } from 'next/navigation';
import Loading from '../loading';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { SocketProvider } from '@/contexts/SocketContext';
import Notif from '@/components/Notif';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { error, data, isLoading } = useQuery({
        queryKey: ['auth'],
        retry: false,
        queryFn: async () => {
            try {
                const data = await axios.get(`/api/auth/status`, {
                    withCredentials: true,
                });
                await axios.get('/api/auth/firstLogin', {
                    withCredentials: true,
                });
                return data;
            } catch {
                redirect('/signin');
            }
        },
    });

    const queryClient = useQueryClient();

    const delai = (ms: number) => new Promise((res) => setTimeout(res, ms));

    useEffect(() => {
        const socket = io(`/auth`, {
            withCredentials: true,
            path: '/api/socket',
            autoConnect: false,
        });

        socket.on('connect', () => {
            queryClient.invalidateQueries(['profile']);
        });

        async function connect() {
            await delai(1500);
            socket.connect();
        }

        connect();

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.disconnect();
        };
    }, []);

    const { data: me, isLoading: myisLoading } = useQuery({
        queryKey: ['mydata'],
        queryFn: async () => {
            try {
                return await axios.get(`/api/user/me`, {
                    withCredentials: true,
                });
            } catch {
                redirect('/signin');
            }
        },
    });

    useEffect(() => {
        if (me?.data.needOtp === true && me?.data.twoFactorEnabled === true) {
            redirect('/twofa');
        }
    }, [me]);

    useEffect(() => {
        if (data?.data.firstLogin === true) {
            redirect('/settings');
        }
    }, [data]);

    if (isLoading || myisLoading) {
        return <Loading />;
    }
    if (error || data?.data.status === false) {
        redirect('/signin');
    }


    return (
        <SocketProvider username={me?.data.username} namespace="Global">
            <div className="flex flex-col min-h-screen">
                <Header />
                <Notif />
                <main className="">{children}</main>
                {/* <Footer /> */}
            </div>
        </SocketProvider>
    );
}
