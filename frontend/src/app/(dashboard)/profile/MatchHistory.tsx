'use client';
import { useContext } from 'react';
import PaddleAndBall from '../../../../public/images/paddle-and-ball.svg';
import GameResult from './GameResult';
import { profileModalContext } from '@/contexts/contexts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { backendHost } from '@/app/globals';

type MatchHistoryProps = {
    username: string;
};

export default function MatchHistory({ username }: MatchHistoryProps) {
    const { data: gameResults, isLoading } = useQuery({
        queryKey: ['matchHistory', username],
        queryFn: async () => {
            const gameResults = await axios.get(
                `${backendHost}/user/get/${username}/games`,
                { withCredentials: true },
            );
            return gameResults.data;
        },
    });

    const { data: me, isLoading: meIsLoading } = useQuery({
        queryKey: ['user', 'me'],
        queryFn: async () => {
            const result = await axios.get(`${backendHost}/user/me`, {
                withCredentials: true,
            });
            return result.data;
        },
    });

    const { setMatches } = useContext(profileModalContext);

    if (isLoading || meIsLoading) return <div>Loading...</div>;
    const slicedGameResults = gameResults.slice(0, 3);

    if (gameResults.length === 0) {
        return (
            <div
                className="bg-primary rounded-2xl
                            flex flex-col items-center lg:justify-center p-2 lg:h-full
                            border-2 border-secondary-200"
            >
                <img
                    src={PaddleAndBall.src}
                    alt="Paddle and Ball"
                    className="w-24"
                />
                <p className="text-gray-400">No matches yet, go play some!</p>
            </div>
        );
    }

    return (
        <div
            className="bg-primary rounded-2xl lg:h-full flex flex-col justify-between
                        border-2 border-secondary-200"
        >
            <div className="px-4 py-1">
                {slicedGameResults.map(
                    (
                        {
                            id,
                            player1,
                            player2,
                            player1_score,
                            player2_score,
                        }: any,
                        idx: number,
                    ) => {
                        const isMe = player1.id === me?.id;

                        return (
                            <div key={id}>
                                <GameResult
                                    playerUsername={
                                        isMe
                                            ? player1.username
                                            : player2.username
                                    }
                                    opponentUsername={
                                        isMe
                                            ? player2.username
                                            : player1.username
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
                                {idx < slicedGameResults.length - 1 && (
                                    <hr className="border-1 border-secondary-200 rounded-full" />
                                )}
                            </div>
                        );
                    },
                )}
            </div>
            {gameResults.length > 3 && (
                <button
                    className="flex items-center justify-center
                            text-sm text-white
                            bg-gradient-to-t from-[#881EDF] to-secondary-200
                            w-full h-8
                            rounded-b-2xl"
                    onClick={() => setMatches(true)}
                >
                    Full match history
                </button>
            )}
        </div>
    );
}
