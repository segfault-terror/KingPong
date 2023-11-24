'use client';
import { useEffect } from 'react';
import MatchMaking from './MatchMaking';
import { useSocket } from '@/contexts/SocketContext';

type Props = {
    matchmaking: boolean;
    setmatchmaking: (matchmaking: boolean) => void;
    me: any;
    oppData: any;
    setOppData: (data: any) => void;
    mode: string;
    ChallengeId?: string;
};
export default function MatchMakingPage({
    setmatchmaking,
    me,
    oppData,
    setOppData,
    mode,
    ChallengeId,
}: Props) {
    const { socket } = useSocket();
    useEffect(() => {
        const data = { username: me.username, league: me.league, mode: mode };
        if (socket && ChallengeId) {
            socket.emit('challenge', {
                id: ChallengeId,
                Challenger: me.username,
                Opponent: '',
            });
        } else if (socket) socket.emit('matchmaking', data);
    }, [ChallengeId, me.league, me.username, mode, socket]);

    return (
        <MatchMaking
            me={me}
            setMatchmaking={setmatchmaking}
            oppData={oppData}
            setOppData={setOppData}
        />
    );
}
