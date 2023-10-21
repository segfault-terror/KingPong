'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import Loading from '@/app/loading';

export default function Page() {
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

    // const { data: leaderboardData, isLoading } = useQuery({
    //     queryKey: ['leaderboard'],
    //     queryFn: async () => {
    //         const { data } = await axios.get(`/api/leaderboard`, {
    //             withCredentials: true,
    //         });
    //         return data;
    //     },
    // });

    // if (isLoading) {
    //     return <Loading />;
    // }

    // interface newData {
    //     username: string;
    //     stats: {
    //         rank: number;
    //         league: string;
    //     };
    // };
    // const leaderboard = leaderboardData?.map(
    //     (entry: newData) =>
    //     ({
    //         username: entry.username,
    //         rank: entry.stats?.rank,
    //         league: entry.stats?.league,
    //     }) as { username: string; rank: number; league: string },
    //     );
    // const myleague = leaderboardData?.find((entry: newData) => entry.username === data?.data.username)?.stats?.league;
    // console.log(myleague);
    // return (
    //     <div className="flex min-h-screen">
    //       <nav className="flex flex-col justify-normal items-center bg-background text-black p-4 w-96 rounded-se-2xl drop-shadow-[0px_0px_2px_#ffffff] flex-1">
    //         <p className="text-3xl font-jost text-white">
    //             <img src={`/images/${myleague}-league.svg`} alt="" className='inline-block' />
    //             &nbsp;  Leaderboard &nbsp;
    //             <img src={`/images/${myleague}-league.svg`} alt="" className='inline-block' />
    //             </p>
    //         <hr className="border-t-2 border-gray-300 w-3/4 my-4" />
    //         <div className="flex justify-center items-center">
    //           {leaderboard.length > 0 && (
    //             <table className="table-auto flex justify-center flex-col">
    //               <thead>
    //                 <tr className='px-4 py-2  rounded-lg'>
    //                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
    //                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
    //                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
    //                 </tr>
    //               </thead>
    //                 <hr className="flex justify-center items-center border-t-2 border-gray-400 w-4/5 rounded-xl m-auto" />
    //               <tbody>
    //                 {leaderboard.map((entry: newData, index) => (
    //                   <tr key={entry.username} className={'flex justify-between bg-primary text-gray-50'}>
    //                     <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
    //                     <td className="px-4 py-2 whitespace-nowrap">{entry.username}</td>
    //                     <td className="px-4 py-2 whitespace-nowrap">{entry.rank}</td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //             </table>
    //           )}
    //         </div>
    //       </nav>
    //       <main className="w-full h-screen  m-auto flex justify-center  items-center text-black relative">
    //         <div className=""></div>
    //       </main>
    //     </div>
    //   );
    return (
        <main className="font-nicomoji text-5xl text-center py-10 text-secondary-200">
            <h3>Welcome Back</h3>
            <h2 className="font-jost text-opponent font-bold text-8xl my-6">
                {data?.data.username}
            </h2>
            <h3>Select mode to start playing</h3>
            <div className="my-8 lg:my-12 text-2xl flex justify-center gap-6 lg:gap-32">
                <Link
                    className="flex items-center justify-center w-44 h-12 border-[5px] rounded-3xl border-opponent bg-secondary-200 text-background"
                    href="/game/normal"
                >
                    Normal
                </Link>
                <Link
                    className="flex items-center justify-center w-44 h-12 border-[5px] rounded-3xl border-secondary-200 bg-opponent text-white"
                    href="/game/ranked"
                >
                    Ranked
                </Link>
            </div>
        </main>
    );
}
