'use client';
import { useQuery } from '@tanstack/react-query';
import Header from './Header';
import axios from 'axios';
import { redirect } from 'next/navigation';
import Loading from '../loading';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { error, data, isLoading } = useQuery({
        queryKey: ['authDashboard'],
        queryFn: async () => {
            try {
                return await axios.get('http://localhost:3000/auth/status', {
                    withCredentials: true,
                });
            } catch {
                redirect('/signin');
            }
        },
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
            <main className="mt-[120px] lg:mt-[110px]">{children}</main>

            {/* <Footer /> */}
        </div>
    );
}
