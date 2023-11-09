import { use } from 'react';
import MatchMaking from './MatchMaking';
import { useSocket } from '@/contexts/SocketContext';

type Props = {
    matchmaking: boolean;
    setmatchmaking: (matchmaking: boolean) => void;
    me: any;
};
export default function MatchMakingPage({matchmaking, setmatchmaking, me}: Props) {
    const {socket} = useSocket();
    socket?.emit('matchmaking', me);
    socket?.on('matchmaking', (foundPlayer: boolean) => {
        if (foundPlayer) setmatchmaking(false);
    });
    return <MatchMaking />;
}
