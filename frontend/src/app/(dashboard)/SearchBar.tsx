'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { backendHost } from '../globals';
import DropdownModal from '../chat/DropdownModal';

type SearchProfileProps = {
    avatar: string;
    fullname: string;
    username: string;
    closeModal: () => void;
};

function SearchProfile({
    avatar,
    fullname,
    username,
    closeModal,
}: SearchProfileProps) {
    return (
        <Link href={`/profile/${username}`} onClick={closeModal}>
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
    closeModal,
}: {
    results?: SearchProfileProps[];
    className?: string;
    closeModal: () => void;
}) {
    return (
        <div
            className={`bg-primary w-full max-h-96 overflow-y-scroll
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
                    closeModal={closeModal}
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
    const [showResults, setShowResults] = useState(false);

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
                onChange={(e) => {
                    const trimmed = e.target.value.trim();
                    setSearch(trimmed);
                    setShowResults(trimmed !== '');
                }}
                onFocus={(e) => {
                    if (e.target.value.trim() === '') return;
                    setShowResults(true);
                }}
                placeholder="Search Player"
            />
            {showResults && (
                <DropdownModal
                    onClose={() => setShowResults(false)}
                    childrenClassName="absolute top-[135px] w-full px-3
                                        md:left-1/2 md:-translate-x-1/2 md:top-[75px] md:w-1/3 md:px-1"
                >
                    <div>
                        <SearchResults
                            className="border border-secondary-500"
                            results={results}
                            closeModal={() => setShowResults(false)}
                        />
                    </div>
                </DropdownModal>
            )}
        </div>
    );
}
