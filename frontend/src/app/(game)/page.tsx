'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../loading';
import { SocketProvider } from '@/contexts/SocketContext';

import React from 'react';
import MatchMaking from './matchmaking/page';
import { match } from 'assert';

type PageProps = {
    children: React.ReactNode;
};

export default function Page({ children }: PageProps) {
    const [matchmaking, setMatchmaking] = React.useState(true);
    const { data: me, isLoading: meLoading } = useQuery(['me'], async () => {
        const { data } = await axios.get(`/api/user/get/stats/me`, {
            withCredentials: true,
        });
        return data;
    });

    if (meLoading) return <Loading />;

    return (
        <SocketProvider namespace="game" username={me.username}>
            {matchmaking && (
                <MatchMaking
                    matchmaking={matchmaking}
                    me={me}
                    setmatchmaking={setMatchmaking}
                />
            )}
            <div className="backdrop-blur-md">{children}</div>
        </SocketProvider>
    );
}
