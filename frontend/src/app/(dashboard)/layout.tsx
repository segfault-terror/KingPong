'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Header from './Header';
import axios from 'axios';
import { redirect } from 'next/navigation';
import Loading from '../loading';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { error, data, isLoading, isSuccess } = useQuery({
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
            await delai(1000);
            socket.connect();
        }

        connect();

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.disconnect();
        };
    });

    if (isLoading) {
        return <Loading />;
    }
    if (error || data?.data.status === false) {
        redirect('/signin');
    }
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="">{children}</main>

            {/* <Footer /> */}
        </div>
    );
}
