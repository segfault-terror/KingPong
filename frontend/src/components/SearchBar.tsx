import Link from 'next/link';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';

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

function SearchResults({
    results,
    className,
}: {
    results?: SearchProfileProps[];
    className?: string;
}) {
    return (
        <div
            className={`absolute top-11 ${results ? 'block' : 'hidden'}
        bg-primary w-full max-h-96 overflow-y-scroll
         scrollbar-thumb-secondary-500 scrollbar-thin ${className}`}
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

export default function SearchBar({ className }: { className?: string }) {
    const [search, setSearch] = useState('');

    return (
        <div className={`bg-primary w-full relative ${className}`}>
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
            <SearchResults
                className="border border-secondary-500"
                results={getSearchResults(search)}
            />
        </div>
    );
}
