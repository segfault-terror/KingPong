'use client';
import Loading from '@/app/loading';
import GameOver from '@/app/(game)/game/standing/GameOver';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { redirect } from 'next/navigation';

async function getOpponent(opponent: string) {
    const { data: opponentData, isLoading: opponentLoading } = useQuery(
        ['opponent', opponent],
        async () => {
            if (!opponent) return null;
            const { data } = await axios.get(`/api/user/get/${opponent}`);
            return data;
        },
    );
    return { opponentData, opponentLoading };
}

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
    console.log('idWinner: ', idWinner);
    console.log('idLoser: ', idLoser);
    console.log('opponent: ', opponent);
    const { data: opponentData, isLoading: opponentLoading } = useQuery(
        ['opponent', opponent],
        async () => {
            if (!opponent) return null;
            const { data } = await axios.get(`/api/user/get/id/${opponent}`);
            return data;
        },
    );
    if (opponentLoading) return <Loading />;
    console.log(opponentData);
    const winner = me.id === idWinner ? me.username : opponentData.username;
    const loser = me.id === idWinner ? opponentData.username : me.username;

    return <GameOver winner={winner} loser={loser} me={me} />;
}

async function StandingPage({ me }: { me: any }) {
    console.log('standing : ', me.username);

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
    console.log('lastMatch: ', lastMatch);
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
