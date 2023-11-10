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
    // const { socket } = useSocket();
    // useEffect(() => {
    //     if (socket) {
    //         console.log('emitting matchmaking');
    //         socket?.on('matchmaking', (foundPlayer: boolean) => {
    //             if (foundPlayer) setmatchmaking(false);
    //         });
    //     }
    // }, [socket]);
    return <MatchMaking me={me} setMatchmaking={setmatchmaking}/>;
}
