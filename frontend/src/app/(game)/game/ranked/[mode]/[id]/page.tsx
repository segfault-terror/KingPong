'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '@/app/loading';
import { SocketProvider } from '@/contexts/SocketContext';

import React, { useEffect, useState } from 'react';
import MatchMaking from '@/app/(game)/matchmaking/MatchMakingPage';
import { redirect } from 'next/navigation';
import Game from '../game';
import { useRouter } from 'next/router';
import { set } from 'react-hook-form';

export default function Page({
    params,
}: {
    params: { id: string; mode: string };
}) {
    const [matchmaking, setMatchmaking] = useState(true);
    const [oppdata, setData] = useState('');
    const {
        data: me,
        isLoading: meLoading,
        isError,
    } = useQuery(['me'], async () => {
        const { data } = await axios.get(`/api/user/get/stats/me`, {
            withCredentials: true,
        });
        return data;
    });

    const ChallengeId = params.id;
    useEffect(() => {
    }, [oppdata]);

    if (meLoading || me.stats === undefined || me.stats.league === undefined)
        return <Loading />;
    const data = {
        username: me.username,
        league: me?.stats.league,
        avatar: me.avatar,
    };
    return (
        <SocketProvider namespace="game" username={me.username}>
            {matchmaking ? (
                <MatchMaking
                    matchmaking={matchmaking}
                    me={data}
                    setmatchmaking={setMatchmaking}
                    oppData={oppdata}
                    setOppData={setData}
                    ChallengeId={ChallengeId}
                    mode={params.mode}
                />
            ) : (
                <Game me={me} opponent={oppdata} />
            )}
        </SocketProvider>
    );
}
