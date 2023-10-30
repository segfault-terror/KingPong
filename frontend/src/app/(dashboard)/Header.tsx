'use client';

import {
    MdChatBubbleOutline,
    MdOutlineNotificationsNone,
    MdOutlinePeopleAlt,
} from 'react-icons/md';
import LinkIcon from './LinkIcon';
import Link from 'next/link';
import SearchBar from './SearchBar';
import DropdownMenu from './Dropdown';
import { use } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

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
    const { data: currentUser } = useQuery({
        queryKey: ['profile', 'current'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/user/me`, {
                withCredentials: true,
            });
            return data;
        },
    });

    const { data: notreadedNotif } = useQuery({
        queryKey: ['notifications', 'notreaded'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/notifications/notreaded`, {
                withCredentials: true,
            });
            return data;
        },
    });
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
                            <MdChatBubbleOutline />
                        </NavItem>
                        <NavItem href="/notifications">
                            <div className="w-full h-full relative">
                                {notreadedNotif && (
                                    <div className="absolute bottom-0 right-0 p-[5px] rounded-full bg-red-500"></div>
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
