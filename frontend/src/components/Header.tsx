'use client';

import {
    MdChatBubbleOutline,
    MdOutlineNotificationsNone,
    MdOutlinePeopleAlt,
} from 'react-icons/md';
import ButtonImage from './ButtonImage';
import LinkIcon from './LinkIcon';
import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

function NavItem({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <li className="hidden md:block">
            <LinkIcon href={href}>{children}</LinkIcon>
        </li>
    );
}

function DropdownItem({
    href,
    children,
    hidden,
}: {
    href: string;
    children: React.ReactNode;
    hidden?: boolean;
}) {
    return (
        <li
            className={`hover:bg-background px-4 py-2 ${
                hidden ? 'lg:hidden' : ''
            }`}
        >
            <Link className="block w-full h-full" href={href}>
                {children}
            </Link>
        </li>
    );
}

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="p-3 w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 items-center">
                <Link href="/" className="block w-56">
                    <img
                        src="/images/logo.svg"
                        className="w-56 md:w-56"
                        alt="logo"
                    />
                </Link>
                <SearchBar className="order-last lg:order-none col-span-2 lg:col-span-1 border border-secondary-500" />
                <nav className="">
                    <ul className="flex gap-4 pr-6 justify-end">
                        <NavItem href="/friends">
                            <MdOutlinePeopleAlt />
                        </NavItem>
                        <NavItem href="/chat">
                            <MdChatBubbleOutline />
                        </NavItem>
                        <NavItem href="/notifications">
                            <MdOutlineNotificationsNone />
                        </NavItem>
                        <li className="relative">
                            <ButtonImage onClick={() => setOpen(!open)}>
                                <img src="/images/4.jpeg" alt="avatar" />
                            </ButtonImage>
                            <div
                                className={`absolute ${
                                    open ? 'block' : 'hidden'
                                } right-0 top-12 bg-primary text-secondary-200 rounded-lg w-48
                                        border border-secondary-500 p-2 z-50`}
                            >
                                <ul className="flex flex-col gap-2">
                                    <DropdownItem href="/profile">
                                        Profile
                                    </DropdownItem>
                                    <hr className="border-inactive-500 lg:hidden" />
                                    <DropdownItem href="/chat" hidden>
                                        Chat
                                    </DropdownItem>
                                    <hr className="border-inactive-500 lg:hidden" />
                                    <DropdownItem hidden href="/notifications">
                                        Notifiations
                                    </DropdownItem>
                                    <hr className="border-inactive-500 lg:hidden" />
                                    <DropdownItem hidden href="/friends">
                                        Friends
                                    </DropdownItem>
                                    <hr className="border-inactive-500" />
                                    <DropdownItem href="/settings">
                                        Settings
                                    </DropdownItem>
                                    <hr className="border-inactive-500" />
                                    <DropdownItem href="/logout">
                                        Logout
                                    </DropdownItem>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
