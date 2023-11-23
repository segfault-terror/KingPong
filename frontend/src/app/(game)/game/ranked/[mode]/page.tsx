'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../../../loading';
import { SocketProvider } from '@/contexts/SocketContext';

import React, { useEffect, useState } from 'react';
import MatchMaking from '../../../matchmaking/page';
import { match } from 'assert';
import { redirect } from 'next/navigation';
import PongApp from './game';
import Game from './game';

export default function Page({ params }: { params: { mode: string } }) {
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
    if (meLoading || me.stats === undefined || me.stats.league === undefined)
        return <Loading />;
    const data = {
        username: me.username,
        league: me?.stats.league,
        avatar: me.avatar,
    };
    return (
        <>
            {matchmaking ? (
                <MatchMaking
                    matchmaking={matchmaking}
                    me={data}
                    setmatchmaking={setMatchmaking}
                    oppData={oppdata}
                    mode={params.mode}
                    setOppData={setData}
                />
            ) : (
                <Game me={me} opponent={oppdata} />
            )}
        </>
    );
}
