import React from 'react';
import Link from 'next/link';
import { newData } from './page';

export default function Navbar(myleague: string, leaderboard: any[]) {
    return (
        <nav
            className={`flex flex-col justify-normal items-center bg-background border-t-2 border-r-2 border-[#a24acf] drop-shadow-[2px_-2px_5px_#a24acfCC] text-black p-4 lg:w-96 w-72 rounded-se-2xl backdrop-blur-lg transition-all duration-500`}
        >
            <Link
                href={'/leaderboard'}
                className="text-3xl font-jost text-white"
            >
                <img
                    src={`/images/${myleague.toLocaleLowerCase()}-league.svg`}
                    alt=""
                    className="inline-block"
                />
                &nbsp; Leaderboard &nbsp;
                <img
                    src={`/images/${myleague.toLocaleLowerCase()}-league.svg`}
                    alt=""
                    className="inline-block"
                />
            </Link>
            <hr className="border-t-2 border-gray-300 w-3/4 my-4" />
            <div className="flex justify-center items-center w-full">
                {leaderboard.length > 0 && (
                    <div className="w-full m-auto rounded-3xl bg-gradient-to-r from-primary to-purple-950">
                        <div className="flex justify-around items-center">
                            <div className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rank
                            </div>
                            <div className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Username
                            </div>
                            <div className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Score
                            </div>
                        </div>
                        <div className="w-full flex flex-col ">
                            {leaderboard
                                .slice(0, 20)
                                .map((entry: newData, index) => (
                                    <Link
                                        href={`/profile/${entry.username}`}
                                        key={entry.username}
                                        className={`flex justify-start items-start  text-gray-50 w-full ${
                                            index !== leaderboard.length - 1 &&
                                            'border-b-2 border-gray-300 border-opacity-40 my-1'
                                        }`}
                                    >
                                        <div className="w-4 h-full px-4 py-2 flex justify-center items-center">
                                            {index + 1}
                                        </div>
                                        <div className="w-3/4 h-full px-4 flex justify-start items-center ">
                                            <img
                                                src={entry.avatar}
                                                alt=""
                                                className="rounded-full w-8 h-8 mr-2 bg-background object-cover"
                                            />
                                            {entry.username.slice(0, 10)}
                                        </div>
                                        <div className="px-4 py-2">
                                            {entry.rank}
                                        </div>
                                    </Link>
                                ))}
                            {leaderboard.length > 20 && (
                                <Link
                                    href={'/leaderboard'}
                                    className="text-center text-white text-sm font-bold hover:underline bg-purple-800 px-4 m-auto"
                                >
                                    Show all
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
