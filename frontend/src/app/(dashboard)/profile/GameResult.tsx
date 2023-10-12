import Link from 'next/link';

export type GameResultProps = {
    opponentUsername: string;
    playerAvatar: string;
    opponentAvatar: string;
    playerLevel: number;
    opponentLevel: number;
    playerScore: number;
    opponentScore: number;
};

export default function GameResult({
    opponentUsername,
    playerAvatar,
    opponentAvatar,
    playerLevel,
    opponentLevel,
    playerScore,
    opponentScore,
}: GameResultProps) {
    const winnerShadow = 'drop-shadow-[0_0_10px_rgba(0,255,0,1)]';
    const loserShadow = 'drop-shadow-[0_0_10px_rgba(255,0,0,1)]';

    return (
        <div className="flex justify-between items-center gap-2 w-full my-4">
            <div
                className={
                    playerScore > opponentScore ? winnerShadow : loserShadow
                }
            >
                <UserCircle avatarPath={playerAvatar} level={playerLevel} />
            </div>

            <p className="text-secondary-200 text-xl font-jost">
                {playerScore} - {opponentScore}
            </p>

            <div
                className={
                    playerScore > opponentScore ? loserShadow : winnerShadow
                }
            >
                <Link href={`/profile/${opponentUsername}`}>
                    <UserCircle
                        avatarPath={opponentAvatar}
                        level={opponentLevel}
                    />
                </Link>
            </div>
        </div>
    );
}

type UserCircleProps = {
    avatarPath: string;
    level: number;
};

function UserCircle({ avatarPath, level }: UserCircleProps) {
    return (
        <div className="rounded-full w-24 h-24">
            <div className="rounded-full w-full h-full overflow-hidden">
                <img
                    src={avatarPath}
                    alt="User Avatar"
                    className="rounded-full object-cover w-full h-full border-4 border-secondary-200"
                />
                <div
                    className="text-primary bg-secondary-200
                                text-center text-sm font-bold font-jost
                                h-[30%]
                                relative bottom-[20%]"
                >
                    {level}
                </div>
            </div>
        </div>
    );
}
