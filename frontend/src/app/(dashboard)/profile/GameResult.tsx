'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { ReactElement } from 'react';

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

/*
 * @brief This function is used to wrap some element with a wrapper if a condition is met.
 *
 * @param condition The condition to be met.
 * @param wrapper A function that returns a ReactElement to be used as a wrapper.
 * @param children The ReactElement to be wrapped.
 */
function conditionalWrapper({
    condition,
    wrapper,
    children,
}: {
    condition: boolean;
    wrapper: (children: ReactElement) => ReactElement;
    children: ReactElement;
}) {
    if (condition) {
        return wrapper(children);
    }
    return children;
}

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
    const { data: currentUser } = useQuery({
        queryKey: ['user', 'me'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/user/me`, {
                withCredentials: true,
            });
            return data;
        },
    });

    return (
        <div className="flex justify-between items-center gap-2 w-full my-4">
            <div>
                {conditionalWrapper({
                    condition: currentUser.username !== playerUsername,
                    wrapper: (children) => (
                        <Link href={`/profile/${playerUsername}`}>
                            {children}
                        </Link>
                    ),
                    children: (
                        <UserCircle
                            avatarPath={playerAvatar}
                            level={playerLevel}
                            playerUsername={playerUsername}
                        />
                    ),
                })}
                <p
                    className={`font-jost font-bold
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
                        className={`font-jost font-bold
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
