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
            <div className="flex items-center p-1 hover:bg-background">
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

function SearchBar() {
    const [search, setSearch] = useState('');
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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Player"
            />
            <SearchResults results={search ? profiles : undefined} />
        </div>
    );
}

export default function Header() {
    return (
        <header className="fixed p-3 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                <div className="">
                    <img
                        src="/images/logo.svg"
                        className="w-56 md:w-56"
                        alt="logo"
                    />
                </div>
                <SearchBar />
                <nav className="">
                    <ul className="flex gap-2">
                        <li className="hidden md:block">
                            <LinkIcon href="#">
                                <MdChatBubbleOutline />
                            </LinkIcon>
                        </li>
                        <li>
                            <ButtonImage>
                                <img src="/images/4.jpeg" alt="avatar" />
                            </ButtonImage>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
