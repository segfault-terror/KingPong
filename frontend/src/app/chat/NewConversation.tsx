'use client';
import { modalContext } from '@/contexts/contexts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useContext, useState } from 'react';
import Loading from '../loading';

function filterUsers(friends: any[], query: string) {
    return friends.filter((friend) => {
        const fullname = friend.fullname.toLowerCase();
        const username = friend.username.toLowerCase();

        return (
            fullname.includes(query.toLowerCase()) ||
            username.includes(query.toLowerCase())
        );
    });
}

export type Friend = {
    fullname: string;
    username: string;
    img: string;
};

export default function JoinNewChannel() {
    const { data, isLoading } = useQuery({
        queryKey: ['friends'],
        queryFn: async () => {
            const { data: friends } = await axios.get(`/api/user/me/friends`, {
                withCredentials: true,
            });
            return friends;
        },
    });

    const [results, setResults] = useState<any[]>([]);
    const { setNewConversation } = useContext(modalContext);

    if (isLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    return (
        <form
            className="text-white accent-secondary-200
						flex flex-col gap-2 font-jost"
        >
            <h1 className="text-secondary-200 text-center text-2xl mb-4">
                Start Conversation
            </h1>

            <input
                type="text"
                placeholder="Search"
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                    }
                }}
                onChange={(event) => {
                    event.preventDefault();
                    const query = event.target.value;
                    if (query === '') {
                        setResults([]);
                        return;
                    }
                    const newResults = filterUsers(data?.friends, query);
                    setResults(newResults);
                }}
                className="bg-background text-white accent-secondary-200
						outline-none
						border-2 border-secondary-200
						rounded-2xl px-2 py-1"
            />
            {results.length !== 0 && (
                <ul
                    className="bg-primary border-[0.5px] border-secondary-200 p-2 max-h-36
							overflow-y-scroll scrollbar-thumb-secondary-200 scrollbar-thin"
                >
                    {results.map((result, idx) => (
                        <Link
                            href={`/chat/dm/${result.username}`}
                            onClick={() => setNewConversation(false)}
                            key={idx}
                            className="hover:bg-background/80 hover:rounded-xl block w-full text-left py-1"
                        >
                            <li className="flex items-center gap-4">
                                <img
                                    src={result.avatar}
                                    alt={`${result.username}'s profile picture`}
                                    className="w-12 h-12 rounded-full object-cover
                                        border-[1px] border-secondary-200 font-jost"
                                />
                                <div className="flex flex-col">
                                    <p>{result.fullname}</p>
                                    <p className="text-secondary-200 italic">
                                        @{result.username}
                                    </p>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </form>
    );
}
