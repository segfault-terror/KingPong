'use client';

import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { redirect } from 'next/navigation';
import Loading from '@/app/loading';
import Link from 'next/link';
import { newData } from '@/app/(dashboard)/home/page';

export default function Leaderboard() {
    const { data, isLoading: myisLoading } = useQuery({
        queryKey: ['userStats'],
        queryFn: async () => {
            try {
                const me = await axios.get(`/api/user/me`, {
                    withCredentials: true,
                });
                const stats = await axios.get(
                    `/api/user/get/${me.data.username}/stats`,
                    { withCredentials: true },
                );
                return stats.data;
            } catch {
                redirect('/signin');
            }
        },
    });

    const { data: leaderboardData, isLoading } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/leaderboard`, {
                withCredentials: true,
            });
            return data;
        },
    });

    const percent: number = useMemo(() => {
        return (data?.stats.rank / 2000) * 100 || 1;
    }, [data]);

    const widthlevel = useMemo(() => {
        return `w-[${percent}%]`;
    }, [percent]);

    if (isLoading || myisLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col justify-center items-start w-full p-4">
            <div className="w-[90%] lg:w-3/5 m-auto bg-background rounded-xl border-secondary-200 border p-1 bg-opacity-50 border-opacity-40 drop-shadow-[0px_0px_2px_#ffffff22]">
                <div className="flex justify-between items-center w-full p-2 text-2xl font-nicomoji">
                    <div className="flex flex-col justify-center items-center w-10 text-sm md:text-2xl md:w-16">
                        <img
                            src="/images/bronze-league.svg"
                            alt=""
                            className="w-5/6"
                        />
                        <p>0</p>
                    </div>
                    <div className="flex flex-col justify-center items-center w-10 text-sm md:text-2xl md:w-16">
                        <img
                            src="/images/silver-league.svg"
                            alt=""
                            className="w-5/6"
                        />
                        <p>1000</p>
                    </div>
                    <div className="flex flex-col justify-center items-center w-10 text-sm md:text-2xl md:w-16">
                        <img
                            src="/images/gold-league.svg"
                            alt=""
                            className="w-5/6"
                        />
                        <p>2000</p>
                    </div>
                </div>
                <div className="flex flex-col justify-around itmes-start w-[90%] text-2xl rounded-full bg-black h-3 m-auto">
                    <div
                        className={`flex justify-center items-center bg-secondary-200 h-1 rounded-full ml-1`}
                        style={{ width: `${percent}%` }}
                    ></div>
                </div>
            </div>
            <div className="w-[90%] lg:w-3/5 m-auto mt-4 rounded-3xl bg-gradient-to-r from-primary to-purple-950 p-2 drop-shadow-[0px_0px_6px_#3b0764]">
                <div className="w-full bg-background rounded-t-2xl border border-gray-500 flex justify-around items-center p-2">
                    <div className="flex justify-center items-center w-4/12">
                        Rank
                    </div>
                    <div className="flex justify-center items-center w-4/12">
                        Name
                    </div>
                    <div className="flex justify-center items-center w-4/12">
                        Score
                    </div>
                </div>
                {leaderboardData
                    .slice(0, 20)
                    .map((entry: newData, index: number) => (
                        <div
                            key={entry.username}
                            className={`flex justify-around items-center text-gray-50 w-full ${
                                index !== leaderboardData.length - 1 &&
                                'border-b-2 border-gray-300 border-opacity-40 my-1'
                            }`}
                        >
                            <div className="h-full w-4/12 px-4 py-2 flex justify-center items-center">
                                {index + 1}
                            </div>
                            <Link
                                href={`/profile/${entry.username}`}
                                className="h-full w-4/12 m-auto px-4 flex justify-start items-center "
                            >
                                <img
                                    src={entry.avatar}
                                    alt=""
                                    className="rounded-full w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-20 xl:h-20 mr-2 bg-background object-cover"
                                />
                                {entry.username.slice(0, 10)}
                            </Link>
                            <div className="w-4/12 px-4 py-2 flex justify-center items-center">
                                {entry.stats.rank}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
