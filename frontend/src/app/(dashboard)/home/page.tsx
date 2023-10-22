'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useMemo } from 'react';
import Navbar from './Navbar';
import Loading from '@/app/loading';
import SelectMode from './SelectMode';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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

    const { data: leaderboardData, isLoading } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/leaderboard`, {
                withCredentials: true,
            });
            return data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }

    const myleague = leaderboardData?.find(
        (entry: newData) => entry.username === data?.data.username,
    )?.stats?.league;

    function MyComponent() {
        const leaderboard = useMemo(() => {
            return leaderboardData?.map(
                (entry: newData) =>
                    ({
                        username: entry.username,
                        rank: entry.stats?.rank,
                        league: entry.stats?.league,
                        avatar: entry.avatar,
                    }) as { username: string; rank: number; league: string, avatar: string },
            );
        }, [leaderboardData]);

        const myleague: string = useMemo(() => {
            return leaderboardData?.find(
                (entry: newData) => entry.username === data?.data.username,
            )?.stats?.league;
        }, [leaderboardData, data]);

        const Transation = isMobile === false ? '' : 'flex-col';

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
                    <div className=" text-white font-nicomoji text-2xl flex justify-center items-center w-[90%] justify-items-center bg-gradient-to-r from-background via-[#4B086D]  to-[#ACC0FE] bg-cover rounded-full border border-white p-2 lg:mx-10  lg:w-[600px] xl:[1000px]">
                        <div className="flex-none relative w-20 h-20 mx-4 my-auto justify-self-start">
                            <img
                                src={data?.data.avatar}
                                alt=""
                                className="bg-primary rounded-full"
                            />
                            <div className="absolute -bottom-2 -right-1 w-8 shrink ">
                                <div className="relative w-full flex flex-col justify-center items-center">
                                    <img
                                        src={`/images/star.svg`}
                                        alt=""
                                        className=""
                                    />
                                    <p className="absolute justify-center items-center text-black m-auto text-sm">
                                        {
                                            leaderboardData?.find(
                                                (entry: newData) =>
                                                    entry.username ===
                                                    data?.data.username,
                                            )?.stats?.level
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 grid grid-row-2 w-full">
                            <h1 className="font-jost text-2xl text-white font-bold justify-items-start">
                                {data?.data.username}
                            </h1>
                            <p
                                className={`font-bold text-xl ${ColorLeague(
                                    myleague,
                                )} justify-items-start`}
                            >{`${myleague}`}</p>
                            <span className="w-[95%] rounded-full h-3 bg-white flex justify-start items-center relative group">
                                <span className="lg:hidden absolute right-0 -top-5 h-4 px-1 rounded-full bg-slate-200 font-extralight text-[10px] text-center text-black group-hover:flex flex justify-center items-center">
                                    500/1000
                                </span>
                                <span className="w-[50%] rounded-full h-1 bg-blue-500 ml-1"></span>
                                {/* for level  */}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:w-full justify-between items-stretch my-auto w-full">
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
