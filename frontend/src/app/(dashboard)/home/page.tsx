'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Navbar from './Navbar';
import Loading from '@/app/loading';
import SelectMode from './SelectMode';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import LevelUp from '@/components/Levelup';

export interface newData {
    rank: number;
    username: string;
    stats: {
        rank: number;
        league: string;
    };
    avatar: string;
}

function ColorLeague(league: string) {
    switch (league) {
        case 'BRONZE':
            return 'text-[#cd7f32]';
        case 'SILVER':
            return 'text-[silver]';
        case 'GOLD':
            return 'text-[gold]';
        default:
            return 'background';
    }
}

export default function Page() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const { data, isLoading: myisLoading } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            try {
                const { data } = await axios.get('/api/user/get/stats/me', {
                    withCredentials: true,
                });
                return data;
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

    if (isLoading || myisLoading) {
        return <Loading />;
    }

    function MyComponent() {
        const leaderboard = useMemo(() => {
            return leaderboardData?.map(
                (entry: newData) =>
                    ({
                        username: entry.username,
                        rank: entry.stats?.rank,
                        league: entry.stats?.league,
                        avatar: entry.avatar,
                    }) as {
                        username: string;
                        rank: number;
                        league: string;
                        avatar: string;
                    },
            );
        }, [leaderboardData]);

        const myleague: string = useMemo(() => {
            return leaderboardData?.find(
                (entry: newData) => entry.username === data?.username,
            )?.stats?.league;
        }, [leaderboardData]);

        const Transation = isMobile === false ? '' : 'flex-col';

        const [percent, setPercent] = useState(0);
        useEffect(() => {
            if (data?.stats === undefined) return;
            setPercent((data?.stats.XP / data?.stats.NextLevelXP) * 100);
        }, [data]);

        if (data?.stats === undefined) return <Loading />;

        if (data.newLevelUp && data?.stats !== undefined) {
            return <LevelUp newLevel={data?.stats.level} data={data} />;
        }
        return (
            <div className={`flex ${Transation}`}>
                {useMemo(() => {
                    return (
                        <>
                            {isMobile ? (
                                <Link
                                    href={'/leaderboard'}
                                    className="h-12 w-12  mt-4"
                                    title="Toggle leaderboard"
                                    placeholder="ranking"
                                >
                                    <img
                                        src="/images/RankingStar.svg"
                                        alt=""
                                        className="w-full rounded-full bg-background  flex justify-center items-center shadow-lg drop-shadow-[0px_0px_10px_#FFE72D]"
                                    />
                                </Link>
                            ) : (
                                <>{Navbar(myleague, leaderboard)}</>
                            )}
                        </>
                    );
                }, [leaderboard, myleague])}
                <main
                    className={`w-full min-h-[80vh] overflow-hidden flex flex-col justify-center items-center lg:justify-normal text-black transition-all duration-500 lg:my-16`}
                >
                    <div
                        className=" text-white font-nicomoji text-2xl flex justify-center items-center
                     w-[90%] justify-items-center bg-gradient-to-r from-background via-[#4B086D]  to-primary
                    bg-cover rounded-full border border-white
                    drop-shadow-[0px_0px_7px_#a24acf] p-2 lg:mx-10  lg:w-[600px] xl:[1000px]"
                    >
                        <div className="flex-none relative w-20 h-20 mx-4 my-auto justify-self-start">
                            <img
                                src={data?.avatar}
                                alt=""
                                className="bg-primary rounded-full w-20 h-20 m-auto object-cover"
                            />
                            <div className="absolute -bottom-2 -right-1 w-8 shrink ">
                                <div className="relative w-full flex flex-col justify-center items-center">
                                    <img
                                        src={`/images/star.svg`}
                                        alt=""
                                        className=" w-full"
                                    />
                                    <p className="absolute justify-center items-center text-black m-auto font-light text-[10px]">
                                        {
                                            leaderboardData?.find(
                                                (entry: newData) =>
                                                    entry.username ===
                                                    data?.username,
                                            )?.stats.level
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 grid grid-row-2 w-full">
                            <h1 className="font-jost text-2xl text-white font-bold justify-items-start">
                                {data?.username}
                            </h1>
                            <p
                                className={`font-bold text-xl ${ColorLeague(
                                    myleague,
                                )} justify-items-start`}
                            >{`${myleague}`}</p>
                            <span className="w-[95%] rounded-full h-3 bg-white flex justify-start items-center relative group">
                                <span className="lg:hidden absolute right-0 -top-5 h-4 px-1 rounded-full bg-slate-200 font-extralight text-[10px] text-center text-black group-hover:flex flex justify-center items-center">
                                    {data?.stats.XP}/{data?.stats.NextLevelXP}
                                </span>
                                <span
                                    className={` rounded-full h-1 bg-blue-500 ml-1`}
                                    style={{
                                        width: `${percent}%`,
                                    }}
                                ></span>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:w-full justify-evenly items-stretch my-auto w-full">
                        <SelectMode
                            mode="Ranked"
                            images="RankedGame"
                            link="/game/ranked"
                            title="Ranked"
                        />
                        <SelectMode
                            mode="Computer"
                            images="Computer"
                            link="/game/computer"
                            title="computer"
                        />
                    </div>
                </main>
            </div>
        );
    }

    return <MyComponent />;
}
