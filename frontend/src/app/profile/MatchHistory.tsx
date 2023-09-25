import GameResult, { GameResultProps } from './GameResult';

type MatchHistoryProps = {
    gameResults: GameResultProps[];
};

export default function MatchHistory({ gameResults }: MatchHistoryProps) {
    return (
        <div className="bg-primary bg-opacity-80 rounded-2xl">
            <div className="px-4 py-1">
                {gameResults.map((gameResult: GameResultProps, idx: number) => {
                    return (
                        <>
                            <GameResult key={idx} {...gameResult} />
                            {idx < gameResults.length - 1 && (
                                <hr className="border-1 border-secondary-200 rounded-full" />
                            )}
                        </>
                    );
                })}
            </div>
            <div
                className="flex items-center justify-center
                            text-sm text-white
                            bg-gradient-to-t from-[#881EDF] to-secondary-200
                            w-full h-8
                            rounded-b-2xl"
            >
                Full match history
            </div>
        </div>
    );
}
