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
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import DropdownModal from '../chat/DropdownModal';

function DropdownItem({
    href,
    children,
    hidden,
    icon,
    close,
}: {
    href: string;
    children: React.ReactNode;
    hidden?: boolean;
    icon?: React.ReactNode;
    close: () => void;
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
            onClick={close}
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
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                return await axios.get(`/api/user/me`, {
                    withCredentials: true,
                });
            } catch {
                redirect('/signin');
            }
        },
    });

    return (
        <li className="relative">
            <ButtonImage onClick={() => setOpen(true)}>
                <img src={data?.data.avatar} alt="avatar" />
            </ButtonImage>
            {open && (
                <DropdownModal
                    onClose={() => setOpen(false)}
                    childrenClassName="top-20 right-8"
                >
                    <div
                        className={`bg-primary text-secondary-200 rounded-lg w-48
                border border-secondary-500 p-2 z-50`}
                    >
                        <ul className="flex flex-col gap-2">
                            <DropdownItem
                                icon={<MdPersonOutline />}
                                href={`/profile/${data?.data.username}`}
                                close={() => setOpen(false)}
                            >
                                Profile
                            </DropdownItem>
                            <hr className="border-inactive-500 lg:hidden" />
                            <DropdownItem
                                href="/chat"
                                hidden
                                icon={<MdChatBubbleOutline />}
                                close={() => setOpen(false)}
                            >
                                Chat
                            </DropdownItem>
                            <hr className="border-inactive-500 lg:hidden" />
                            <DropdownItem
                                hidden
                                href="/notifications"
                                icon={<MdOutlineNotificationsNone />}
                                close={() => setOpen(false)}
                            >
                                Notifiations
                            </DropdownItem>
                            <hr className="border-inactive-500 lg:hidden" />
                            <DropdownItem
                                hidden
                                href="/friends"
                                icon={<MdOutlinePeopleAlt />}
                                close={() => setOpen(false)}
                            >
                                Friends
                            </DropdownItem>
                            <hr className="border-inactive-500" />
                            <DropdownItem
                                href="/settings"
                                icon={<MdOutlineSettings />}
                                close={() => setOpen(false)}
                            >
                                Settings
                            </DropdownItem>
                            <hr className="border-inactive-500" />
                            {/* <DropdownItem href="/logout" icon={<MdOutlineLogout />}>
                        Logout
                    </DropdownItem> */}
                            <li className={`hover:bg-background px-4 py-2`}>
                                <button
                                    className="w-full h-full flex items-start gap-2"
                                    onClick={() => {
                                        window.open(
                                            `/api/auth/logout`,
                                            '_self',
                                        );
                                    }}
                                >
                                    <MdOutlineLogout className="w-6 h-6" />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </DropdownModal>
            )}
        </li>
    );
}
