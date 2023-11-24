'use client';
import Loading from '@/app/loading';
import GameOver from '@/app/(game)/game/standing/GameOver';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { redirect } from 'next/navigation';

function Standing({ lastMatch, me }: { lastMatch: any; me: any }) {
    const idWinner =
        lastMatch.player1_score > lastMatch.player2_score
            ? lastMatch.player1Id
            : lastMatch.player2Id;
    const idLoser =
        lastMatch.player1_score > lastMatch.player2_score
            ? lastMatch.player2Id
            : lastMatch.player1Id;
    const opponent = me.id === idWinner ? idLoser : idWinner;
    const { data: opponentData, isLoading: opponentLoading } = useQuery(
        ['opponent', opponent],
        async () => {
            if (!opponent) return null;
            const { data } = await axios.get(`/api/user/get/id/${opponent}`);
            return data;
        },
    );
    if (opponentLoading) return <Loading />;
    const winner = me.id === idWinner ? me.username : opponentData.username;
    const loser = me.id === idWinner ? opponentData.username : me.username;

    return <GameOver winner={winner} loser={loser} me={me} />;
}

function StandingPage({ me }: { me: any }) {

    const {
        data: lastMatch,
        isLoading: lastMatchLoading,
        isError: lastMatchError,
    } = useQuery(['lastMatch'], async () => {
        try {
            const { data } = await axios.get(
                `/api/game/get/lastmatch/${me.username}`,
                {
                    withCredentials: true,
                },
            );
            return data;
        } catch {
            redirect('/signin');
        }
    });
    if (lastMatchLoading) return <Loading />;
    if (!lastMatch) redirect('/home');
    return <Standing lastMatch={lastMatch} me={me} />;
}

export default function Page() {
    const {
        data: me,
        isLoading: meLoading,
        isError: meError,
    } = useQuery(['me'], async () => {
        try {
            const { data } = await axios.get('/api/user/me', {
                withCredentials: true,
            });
            return data;
        } catch {
            redirect('/signin');
        }
    });

    if (meLoading) return <Loading />;
    if (meError) redirect('/signin');

    return <StandingPage me={me} />;
}
