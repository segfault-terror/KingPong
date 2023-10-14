'use client';
import PaddleAndBall from '../../../../public/images/paddle-and-ball.svg';
import GameResult from './GameResult';
import { Users, UsersMatchHistory, UsersStats } from './data/ProfileData';

type MatchHistoryProps = {
    username: string;
};

export default function MatchHistory({ username }: MatchHistoryProps) {
    const gameResults = UsersMatchHistory.filter(
        (gameResult) => gameResult.username === username,
    );
    const slicedGameResults = gameResults.slice(0, 3);
    const user = Users.find((user) => user.username === username);
    const userStats = UsersStats.find(
        (userStat) => userStat.username === username,
    );

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
                {slicedGameResults.map((gameResult, idx: number) => {
                    const opponent = Users.find(
                        (user) => user.username === gameResult.opponentUsername,
                    );
                    const opponentStats = UsersStats.find((userStat) => {
                        return (
                            userStat.username === gameResult.opponentUsername
                        );
                    });
                    return (
                        <div key={idx}>
                            <GameResult
                                opponentUsername={gameResult.opponentUsername}
                                playerAvatar={user!.avatarPath}
                                opponentAvatar={opponent!.avatarPath}
                                playerLevel={userStats!.level}
                                opponentLevel={opponentStats!.level}
                                playerScore={gameResult.playerScore}
                                opponentScore={gameResult.opponentScore}
                            />
                            {idx < slicedGameResults.length - 1 && (
                                <hr className="border-1 border-secondary-200 rounded-full" />
                            )}
                        </div>
                    );
                })}
            </div>
            {gameResults.length > 3 && (
                <button
                    className="flex items-center justify-center
                            text-sm text-white
                            bg-gradient-to-t from-[#881EDF] to-secondary-200
                            w-full h-8
                            rounded-b-2xl"
                    onClick={() => console.log('See all matches clicked!')}
                >
                    Full match history
                </button>
            )}
        </div>
    );
}
