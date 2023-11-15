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
    const { socket } = useSocket();
    socket?.emit('matchmaking', me);

    return <MatchMaking me={me} setMatchmaking={setmatchmaking} oppData={oppData} setOppData={setOppData}/>;
}
