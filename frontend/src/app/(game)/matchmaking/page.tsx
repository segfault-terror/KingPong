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
    ChallengeId?: string;
};
export default function MatchMakingPage({
    matchmaking,
    setmatchmaking,
    me,
    oppData,
    setOppData,
    ChallengeId,
}: Props) {
    const data = { username: me.username, league: me.league };
    const { socket } = useSocket();
    useEffect(() => {
        if (socket && ChallengeId) {
            socket.emit('challenge', {id:ChallengeId, Challenger: me.username, Opponent: ""});
        }
        else if (socket) socket.emit('matchmaking', data);
    }, [socket]);

    return (
        <MatchMaking
            me={me}
            setMatchmaking={setmatchmaking}
            oppData={oppData}
            setOppData={setOppData}
        />
    );
}
