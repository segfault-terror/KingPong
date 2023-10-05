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

function NavItem({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <li className="hidden lg:block">
            <LinkIcon href={href}>{children}</LinkIcon>
        </li>
    );
}

export default function Header() {
    return (
        <header className="p-3 w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 items-center">
                <Link href="/" className="block w-56">
                    <img
                        src="/images/logo.svg"
                        className="w-56 lg:w-56"
                        alt="logo"
                    />
                </Link>
                <SearchBar className="order-last md:order-none col-span-2 md:col-span-1 border border-secondary-500" />
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
                        <DropdownMenu />
                    </ul>
                </nav>
            </div>
        </header>
    );
}
