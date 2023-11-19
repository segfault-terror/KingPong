'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

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
    if (error || data?.data.status === false) {
        redirect('/signin');
    }
    return <div className='bg-gameBg bg-cover bg-fix'>{children}</div>;
}
