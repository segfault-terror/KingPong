'use client';
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
    me: any;
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

    return (
        <>
            {standing && (
                <StandingGame
                    youWin={opp === loser}
                    myimage={me.avatar}
                    oppimage={opponent.avatar}
                />
            )}
        </>
    );
}
