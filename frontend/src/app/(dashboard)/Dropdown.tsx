import Link from 'next/link';
import React, { useState } from 'react';
import {
    MdPersonOutline,
    MdChatBubbleOutline,
    MdOutlineNotificationsNone,
    MdOutlinePeopleAlt,
    MdOutlineSettings,
    MdOutlineLogout,
} from 'react-icons/md';
import ButtonImage from './ButtonImage';

function DropdownItem({
    href,
    children,
    hidden,
    icon,
}: {
    href: string;
    children: React.ReactNode;
    hidden?: boolean;
    icon?: React.ReactNode;
}) {
    const renderIcon = () => {
        if (!icon) return null;
        return React.cloneElement(icon as React.ReactElement, {
            className: 'w-6 h-6',
        });
    };
    return (
        <li
            className={`hover:bg-background px-4 py-2 ${
                hidden ? 'lg:hidden' : ''
            }`}
        >
            <Link className="w-full h-full flex items-start gap-2" href={href}>
                {renderIcon()}
                {children}
            </Link>
        </li>
    );
}

export default function DropdownMenu() {
    const [open, setOpen] = useState(false);

    return (
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
                    <DropdownItem icon={<MdPersonOutline />} href="/profile">
                        Profile
                    </DropdownItem>
                    <hr className="border-inactive-500 lg:hidden" />
                    <DropdownItem
                        href="/chat"
                        hidden
                        icon={<MdChatBubbleOutline />}
                    >
                        Chat
                    </DropdownItem>
                    <hr className="border-inactive-500 lg:hidden" />
                    <DropdownItem
                        hidden
                        href="/notifications"
                        icon={<MdOutlineNotificationsNone />}
                    >
                        Notifiations
                    </DropdownItem>
                    <hr className="border-inactive-500 lg:hidden" />
                    <DropdownItem
                        hidden
                        href="/friends"
                        icon={<MdOutlinePeopleAlt />}
                    >
                        Friends
                    </DropdownItem>
                    <hr className="border-inactive-500" />
                    <DropdownItem href="/settings" icon={<MdOutlineSettings />}>
                        Settings
                    </DropdownItem>
                    <hr className="border-inactive-500" />
                    <DropdownItem href="/logout" icon={<MdOutlineLogout />}>
                        Logout
                    </DropdownItem>
                </ul>
            </div>
        </li>
    );
}
