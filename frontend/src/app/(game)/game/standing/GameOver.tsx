'use client'
import { useState } from 'react';
import StandingGame from './StandingGame';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { redirect } from 'next/navigation';
import Loading from '@/app/loading';

export default function GameOver({
    winner,
    loser,
    me,
}: {
    winner: string;
    loser: string;
    me: any
}) {
    const [standing, setStanding] = useState(false);
    setTimeout(() => {
        setStanding(true);
    }, 2000);

    const opp = me.username === winner ? loser : winner;

    const { data: opponent, isLoading: oppLoading } = useQuery(
        ['opponent', loser],
        async () => {
            if (!loser) return null;
            const { data } = await axios.get(`/api/user/get/${opp}`);
            return data;
        },
    );

	if (oppLoading) return <Loading />;

    return !standing ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity delay-75 duration-500">
			<div className='h-36 w-56 bg-background/75 border-2 border-secondary-500 text-center font-jost text-2xl flex justify-center items-center rounded-xl backdrop-blur-lg'>
				Game is Over!
			</div>
		</div>
    ) : (
        <StandingGame youWin={opp === loser} myimage={me.avatar} oppimage={opponent.avatar} />
    );
}
