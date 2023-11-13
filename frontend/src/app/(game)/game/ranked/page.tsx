'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../../loading';
import { SocketProvider } from '@/contexts/SocketContext';

import React from 'react';
import MatchMaking from '../../matchmaking/page';
import { match } from 'assert';
import { redirect } from 'next/navigation';
import PongApp from './game';
import Game from './game';

export default function Page() {
    const [matchmaking, setMatchmaking] = React.useState(true);
    const {
        data: me,
        isLoading: meLoading,
        isError,
    } = useQuery(['me'], async () => {
        try {
            const { data } = await axios.get(`/api/user/get/stats/me`, {
                withCredentials: true,
            });
            return data;
        } catch {
            redirect('/signin');
        }
    });

    if (isError) redirect('/signin');
    if (meLoading) return <Loading />;
    console.log('me', me);
    return (
        <SocketProvider namespace="game" username={me.username}>
            {matchmaking ? (
                <MatchMaking
                    matchmaking={matchmaking}
                    me={me}
                    setmatchmaking={setMatchmaking}
                />
            ) : (
                <Game data={me} />
            )}
        </SocketProvider>
    );
}
