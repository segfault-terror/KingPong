import { use, useEffect } from 'react';
import MatchMaking from './MatchMaking';
import { useSocket } from '@/contexts/SocketContext';
import { set } from 'react-hook-form';

type Props = {
    matchmaking: boolean;
    setmatchmaking: (matchmaking: boolean) => void;
    me: any;
};
export default function MatchMakingPage({
    matchmaking,
    setmatchmaking,
    me,
}: Props) {
    const { socket } = useSocket();
    socket?.emit('matchmaking', me);

    return <MatchMaking me={me} setMatchmaking={setmatchmaking}/>;
}
