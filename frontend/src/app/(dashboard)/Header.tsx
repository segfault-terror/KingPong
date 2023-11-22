'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { MdChatBubbleOutline, MdOutlinePeopleAlt } from 'react-icons/md';
import { io } from 'socket.io-client';
import Loading from '../loading';
import DropdownMenu from './Dropdown';
import LinkIcon from './LinkIcon';
import SearchBar from './SearchBar';

function NavItem({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <li className="hidden lg:block ">
            <LinkIcon href={href}>{children}</LinkIcon>
        </li>
    );
}

export default function Header() {
    const { data: currentUser, isLoading: isLoadingme } = useQuery({
        queryKey: ['profile', 'current'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/user/me`, {
                withCredentials: true,
            });
            return data;
        },
    });

    const queryClient = useQueryClient();
    const pathname = usePathname();

    useEffect(() => {
        if (!currentUser) return;

        const socket = io('/Global', {
            withCredentials: true,
            path: '/api/socket',
            autoConnect: false,
        });

        async function connect() {
            await new Promise((resolve) => setTimeout(resolve, 500));
            socket.connect();
        }

        connect();
        socket.emit('register', currentUser.username);

        socket.on('chat-notif', ({ sender }: { sender: string }) => {
            if (pathname === `/chat/dm/${sender}`) {
                axios.post(`/api/chat/dm/read/${sender}`, {
                    withCredentials: true,
                });
                return;
            }

            queryClient.invalidateQueries(['notifications', 'chat'], {
                exact: true,
            });
        });

        return () => {
            setTimeout(() => socket.close(), 0);
        };
    }, [currentUser, pathname, queryClient]);

    const { data: notreadedNotif, isLoading } = useQuery({
        queryKey: ['notifications', 'notreaded'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/notifications/notreaded`, {
                withCredentials: true,
            });
            return data;
        },
    });

    const { data: chatNotif, isLoading: isLoadingChatNotif } = useQuery({
        queryKey: ['notifications', 'chat'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/chat/is-unread`, {
                withCredentials: true,
            });
            return data.readAll;
        },
        refetchOnWindowFocus: false,
    });

    if (isLoadingme || isLoading || isLoadingChatNotif) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    return (
        <header className="p-3 w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 items-center">
                <Link href="/home" className="block w-56">
                    <img
                        src="/images/logo.svg"
                        className="w-56 lg:w-56 select-none"
                        alt="logo"
                    />
                </Link>
                <SearchBar className="order-last md:order-none col-span-2 md:col-span-1 border border-secondary-500" />
                <nav className="">
                    <ul className="flex gap-4 pr-6 justify-end">
                        <NavItem href={`/${currentUser?.username}/friends`}>
                            <MdOutlinePeopleAlt />
                        </NavItem>
                        <NavItem href="/chat">
                            <div className="w-full h-full realtive">
                                {!chatNotif && (
                                    <>
                                        <div className="absolute bottom-0 right-0 p-[5px] rounded-full bg-red-500 animate-ping" />
                                        <div className="absolute bottom-0 right-0 p-[5px] rounded-full bg-red-500" />
                                    </>
                                )}
                                <MdChatBubbleOutline className="w-full h-full" />
                            </div>
                        </NavItem>
                        <NavItem href="/notifications">
                            <div className="w-full h-full relative">
                                {notreadedNotif && (
                                    <>
                                        <div className="absolute bottom-0 right-0 p-[5px] rounded-full bg-red-500 animate-ping" />
                                        <div className="absolute bottom-0 right-0 p-[5px] rounded-full bg-red-500" />
                                    </>
                                )}
                                <img
                                    src="/images/notification.svg"
                                    alt=""
                                    className="w-full h-full"
                                />
                            </div>
                        </NavItem>
                        <DropdownMenu />
                    </ul>
                </nav>
            </div>
        </header>
    );
}
