import GameResult from './GameResult';
import { Users, UsersMatchHistory, UsersStats } from './data/ProfileData';

type GameResultModalProps = {
    userName: string;
};

export default function MatchHistoryModal({ userName }: GameResultModalProps) {
    const gameResults = UsersMatchHistory.filter(
        (gameResult) => gameResult.username === userName,
    );

    const user = Users.find((user) => user.username === userName);
    const userStats = UsersStats.find(
        (userStat) => userStat.username === userName,
    );

    return (
        <div className="px-4 py-1">
            {gameResults.map((gameResult, idx: number) => {
                const opponent = Users.find(
                    (user) => user.username === gameResult.opponentUsername,
                );
                const opponentStats = UsersStats.find((userStat) => {
                    return userStat.username === gameResult.opponentUsername;
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
                        {idx < gameResults.length - 1 && (
                            <hr className="border-1 border-secondary-200 rounded-full" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
