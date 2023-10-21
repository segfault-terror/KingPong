'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Header from './Header';
import axios from 'axios';
import { redirect } from 'next/navigation';
import Loading from '../loading';
import { backendHost } from '../globals';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { error, data, isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: async () => {
            try {
                return await axios.get(`${backendHost}/auth/status`, {
                    withCredentials: true,
                });
            } catch {
                redirect('/signin');
            }
        },
    });

    const queryClient = useQueryClient();

    useEffect(() => {
        const socket = io(`${backendHost}/auth`, {
            withCredentials: true,
        });

        socket.on('connect', () => {
            queryClient.invalidateQueries(['profile']);
        });

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
