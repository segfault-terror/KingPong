import Link from 'next/link';

export type GameResultProps = {
    playerUsername: string;
    opponentUsername: string;
    playerAvatar: string;
    opponentAvatar: string;
    playerLevel: number;
    opponentLevel: number;
    playerScore: number;
    opponentScore: number;
};

export default function GameResult({
    playerUsername,
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
            <div>
                <UserCircle
                    avatarPath={playerAvatar}
                    level={playerLevel}
                    playerUsername={playerUsername}
                />
                <p
                    className={`font-jost
                                text-center text-lg ${
                                    playerScore > opponentScore
                                        ? 'text-online'
                                        : 'text-[red]'
                                }`}
                >
                    {playerUsername}
                </p>
            </div>

            <p className="text-secondary-200 text-xl font-jost">
                {playerScore} - {opponentScore}
            </p>

            <div>
                <Link href={`/profile/${opponentUsername}`}>
                    <UserCircle
                        avatarPath={opponentAvatar}
                        level={opponentLevel}
                        playerUsername={opponentUsername}
                    />
                    <p
                        className={`font-jost
                                    text-center text-lg ${
                                        playerScore > opponentScore
                                            ? 'text-[red]'
                                            : 'text-online'
                                    }`}
                    >
                        {opponentUsername}
                    </p>
                </Link>
            </div>
        </div>
    );
}

type UserCircleProps = {
    playerUsername: string;
    avatarPath: string;
    level: number;
};

function UserCircle({ playerUsername, avatarPath, level }: UserCircleProps) {
    return (
        <div className="rounded-full w-24 h-24">
            <div className="rounded-full w-full h-full overflow-hidden">
                <img
                    src={avatarPath}
                    alt="User Avatar"
                    title={`${playerUsername}`}
                    className="rounded-full object-cover w-full h-full border-4 border-secondary-200 select-none
                            bg-background"
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
