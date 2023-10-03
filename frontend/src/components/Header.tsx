'use client';

import { MdChatBubbleOutline, MdSearch } from 'react-icons/md';
import ButtonImage from './ButtonImage';
import LinkIcon from './LinkIcon';
import { useState } from 'react';
import Link from 'next/link';

type SearchProfileProps = {
    avatar: string;
    fullname: string;
    username: string;
};

function SearchProfile({ avatar, fullname, username }: SearchProfileProps) {
    return (
        <Link href="#">
            <div className="flex items-center px-4 py-2 hover:bg-background">
                <div className="w-12 h-12 rounded-full bg-secondary-200">
                    <img
                        src={avatar}
                        className="w-full h-full object-cover rounded-full"
                        alt="avatar"
                    />
                </div>
                <div className="ml-2">
                    <h3 className="text-secondary-200 font-jost font-medium">
                        {fullname}
                    </h3>
                    <p className="text-secondary-200/70 font-jost">
                        @{username}
                    </p>
                </div>
            </div>
        </Link>
    );
}

function SearchResults({ results }: { results?: SearchProfileProps[] }) {
    return (
        <div
            className={`absolute top-11 ${results ? 'block' : 'hidden'}
        bg-primary w-full max-h-96 overflow-y-scroll
         scrollbar-thumb-secondary-500 scrollbar-thin`}
        >
            {results?.map((result) => (
                <SearchProfile
                    key={result.username}
                    avatar={result.avatar}
                    fullname={result.fullname}
                    username={result.username}
                />
            ))}
        </div>
    );
}

function getSearchResults(search: string) {
    const profiles = [
        {
            avatar: '/images/1.jpeg',
            fullname: 'Tommy Shelby',
            username: 'Tommy',
        },
        {
            avatar: '/images/2.jpeg',
            fullname: 'Archer',
            username: 'Archer-01',
        },
        {
            avatar: '/images/4.jpeg',
            fullname: 'Note',
            username: 'note',
        },
    ];
    if (!search) return undefined;
    const result = profiles.filter((profile) => {
        return (
            profile.fullname.toLowerCase().includes(search.toLowerCase()) ||
            profile.username.toLowerCase().includes(search.toLowerCase())
        );
    });
    return result.length > 0 ? result : undefined;
}

function SearchBar() {
    const [search, setSearch] = useState('');

    return (
        <div className="bg-primary w-full relative">
            <div className="absolute left-0 inset-y-0 pl-1 flex items-center pointer-events-none">
                <MdSearch className="w-6 h-6 text-secondary-200/70" />
            </div>
            <input
                className="bg-transparent w-full pl-8 py-2 px-3
                            placeholder:text-secondary-200/70
                            text-secondary-200 font-jost
                            outline-none"
                type="text"
                onChange={(e) => setSearch(e.target.value.trim())}
                placeholder="Search Player"
            />
            <SearchResults results={getSearchResults(search)} />
        </div>
    );
}

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="p-3 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                <Link href="/" className="">
                    <img
                        src="/images/logo.svg"
                        className="w-56 md:w-56"
                        alt="logo"
                    />
                </Link>
                <SearchBar />
                <nav className="">
                    <ul className="flex gap-2 justify-end">
                        <li className="hidden md:block">
                            <LinkIcon href="#">
                                <MdChatBubbleOutline />
                            </LinkIcon>
                        </li>
                        <li className="relative">
                            <ButtonImage onClick={() => setOpen(!open)}>
                                <img src="/images/4.jpeg" alt="avatar" />
                            </ButtonImage>
                            <div
                                className={`absolute ${
                                    open ? 'block' : 'hidden'
                                } right-0 top-12 bg-primary text-secondary-200 rounded-lg w-48
                                        border border-secondary-500 p-2`}
                            >
                                <ul className="flex flex-col gap-2">
                                    <li className="hover:bg-background px-4 py-2">
                                        <Link
                                            className="block w-full h-full"
                                            href="/profile"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <hr className="border-inactive-500" />
                                    <li className="hover:bg-background px-4 py-2">
                                        <Link
                                            className="block w-full h-full"
                                            href="/chat"
                                        >
                                            Chat
                                        </Link>
                                    </li>
                                    <hr className="border-inactive-500" />
                                    <li className="hover:bg-background px-4 py-2">
                                        <Link
                                            className="block w-full h-full"
                                            href="/notifications"
                                        >
                                            Notifiations
                                        </Link>
                                    </li>
                                    <hr className="border-inactive-500" />
                                    <li className="hover:bg-background px-4 py-2">
                                        <Link
                                            className="block w-full h-full"
                                            href="/settings"
                                        >
                                            Settings
                                        </Link>
                                    </li>
                                    <hr className="border-inactive-500" />
                                    <li className="hover:bg-background px-4 py-2">
                                        <Link
                                            className="block w-full h-full"
                                            href="/logout"
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
