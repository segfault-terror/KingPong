import { use, useEffect } from 'react';
import MatchMaking from './MatchMaking';
import { useSocket } from '@/contexts/SocketContext';
import { set } from 'react-hook-form';

type Props = {
    matchmaking: boolean;
    setmatchmaking: (matchmaking: boolean) => void;
    me: any;
    oppData: any;
    setOppData: (data: any) => void;
};
export default function MatchMakingPage({
    matchmaking,
    setmatchmaking,
    me,
    oppData,
    setOppData,
}: Props) {
    const data = { username: me.username, league: me.league };
    const { socket } = useSocket();
    useEffect(() => {
        if (socket) socket.emit('matchmaking', data);
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
