'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { backendHost } from '../globals';

type SearchProfileProps = {
    avatar: string;
    fullname: string;
    username: string;
};

function SearchProfile({ avatar, fullname, username }: SearchProfileProps) {
    return (
        <Link href={`/profile/${username}`}>
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
         scrollbar-thumb-secondary-500 scrollbar-track-transparent scrollbar-thin ${className}`}
        >
            {results?.length === 0 && (
                <p className="text-secondary-200 font-jost text-center py-2">
                    No results found
                </p>
            )}
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

export default function SearchBar({ className }: { className?: string }) {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<SearchProfileProps[] | undefined>(
        [],
    );

    const {} = useQuery({
        queryKey: ['search', search],
        queryFn: async () => {
            if (!search) {
                setResults(undefined);
                return [];
            }
            const { data } = await axios.get(`${backendHost}/user/search`, {
                withCredentials: true,
                params: { q: search },
            });
            const profiles: SearchProfileProps[] = data.map((profile: any) => {
                return {
                    fullname: profile.fullname,
                    username: profile.username,
                    avatar: profile.avatar,
                } as SearchProfileProps;
            });
            setResults(profiles);
            return profiles;
        },
    });

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
                results={results}
            />
        </div>
    );
}
