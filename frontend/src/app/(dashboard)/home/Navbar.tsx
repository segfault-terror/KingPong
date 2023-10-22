import React from 'react';
import Link from 'next/link';
import { newData } from './page';


export default function Navbar(myleague: string, leaderboard: any[]) {
    return (
        <nav
            className={`flex flex-col justify-normal items-center bg-background text-black p-4 lg:w-96 w-72 rounded-se-2xl flex-1 transition-all duration-500`}
        >
            <p className="text-3xl font-jost text-white">
                <img
                    src={`/images/${myleague}-league.svg`}
                    alt=""
                    className="inline-block"
                />
                &nbsp; Leaderboard &nbsp;
                <img
                    src={`/images/${myleague}-league.svg`}
                    alt=""
                    className="inline-block"
                />
            </p>
            <hr className="border-t-2 border-gray-300 w-3/4 my-4" />
            <div className="flex justify-center items-center">
                {leaderboard.length > 0 && (
                    <table className="table-auto flex justify-center flex-col">
                        <thead>
                            <tr className="px-4 py-2  rounded-lg">
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rank
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Username
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Score
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard
                                .slice(0, 20)
                                .map((entry: newData, index) => (
                                    <tr
                                        key={entry.username}
                                        className={
                                            'flex justify-between bg-primary text-gray-50'
                                        }
                                    >
                                        <td className="px-4 py-2">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-2">
                                            {entry.username}
                                        </td>
                                        <td className="px-4 py-2">
                                            {entry.rank}
                                        </td>
                                    </tr>
                                ))}
                            {leaderboard.length > 20 && (
                                <Link
                                    href={'/leaderboard'}
                                    className="text-center text-white text-sm font-bold hover:underline bg-purple-800 px-4 m-auto"
                                >
                                    Show all
                                </Link>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </nav>
    );
}