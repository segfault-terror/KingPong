import { useQuery } from '@tanstack/react-query';
import GameResult from './GameResult';
import { Users, UsersMatchHistory, UsersStats } from './data/ProfileData';
import axios from 'axios';
import Loading from '@/app/loading';


type GameResultModalProps = {
    userName: string;
};

export default function MatchHistoryModal({ userName }: GameResultModalProps) {
    const { data: gameResults, isLoading } = useQuery({
        queryKey: ['matchHistory', userName],
        queryFn: async () => {
            const gameResults = await axios.get(
                `/api/user/get/${userName}/games`,
                { withCredentials: true },
            );
            return gameResults.data;
        },
    });

    const { data: me, isLoading: meIsLoading } = useQuery({
        queryKey: ['user', 'me'],
        queryFn: async () => {
            const result = await axios.get(`/api/user/me`, {
                withCredentials: true,
            });
            return result.data;
        },
    });

    if (isLoading || meIsLoading) {
        return (
            <div className="bg-default fixed inset-0 z-50">
                <Loading />
            </div>
        );
    }

    return (
        <div className="px-4 py-1">
            {gameResults.map(
                (
                    { id, player1, player2, player1_score, player2_score }: any,
                    idx: number,
                ) => {
                    const isMe = player1.id === me?.id;

                    return (
                        <div key={id}>
                            <GameResult
                                playerUsername={
                                    isMe ? player1.username : player2.username
                                }
                                opponentUsername={
                                    isMe ? player2.username : player1.username
                                }
                                playerAvatar={
                                    isMe ? player1.avatar : player2.avatar
                                }
                                opponentAvatar={
                                    isMe ? player2?.avatar : player1.avatar
                                }
                                playerLevel={
                                    isMe
                                        ? player1?.stats.level
                                        : player2.stats.level
                                }
                                opponentLevel={
                                    isMe
                                        ? player2?.stats.level
                                        : player1.stats.level
                                }
                                playerScore={player1_score}
                                opponentScore={player2_score}
                            />
                            {idx < gameResults.length - 1 && (
                                <hr className="border-1 border-secondary-200 rounded-full" />
                            )}
                        </div>
                    );
                },
            )}
        </div>
    );
}
