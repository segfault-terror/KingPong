'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../../loading';
import { SocketProvider } from '@/contexts/SocketContext';

import React, { useEffect, useState } from 'react';
import MatchMaking from '../../matchmaking/page';
import { match } from 'assert';
import { redirect } from 'next/navigation';
import PongApp from './game';
import Game from './game';

export default function Page() {
    const [matchmaking, setMatchmaking] = useState(true);
    const [oppdata, setData] = useState('');
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

    useEffect(() => {
        console.log('oppData: ', oppdata);
    }, [oppdata]);

    if (isError) redirect('/signin');
    if (meLoading) return <Loading />;
    return (
        <SocketProvider namespace="game" username={me.username}>
            {matchmaking ? (
                <MatchMaking
                    matchmaking={matchmaking}
                    me={me}
                    setmatchmaking={setMatchmaking}
                    oppData={oppdata}
                    setOppData={setData}
                />
            ) : (
                <Game me={me} opponent={oppdata} />
            )}
        </SocketProvider>
    );
}
