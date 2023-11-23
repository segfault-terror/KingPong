'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { redirect } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

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

    useEffect(() => {
        history.pushState(null, document.title, location.href);

        function exitGame(event: any) {
            const result = confirm('Are you sure you want to leave this page?');
            if (result) {
                window.location.href = '/home';
            } else {
                history.pushState(null, document.title, location.href);
            }
        }
        window.addEventListener('popstate', exitGame);

        return () => {
            window.removeEventListener('popstate', exitGame);
        };
    });
    if (error || data?.data.status === false) {
        redirect('/signin');
    }
    return (
        <div className="bg-gameBg h-screen bg-cover bg-fix overflow-y-auto">
            {children}
        </div>
    );
}
