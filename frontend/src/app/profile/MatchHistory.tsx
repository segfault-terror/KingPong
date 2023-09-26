import GameResult, { GameResultProps } from './GameResult';
import PaddleAndBall from '../../../public/images/paddle-and-ball.svg';

type MatchHistoryProps = {
    gameResults: GameResultProps[];
};

export default function MatchHistory({ gameResults }: MatchHistoryProps) {
    if (gameResults.length === 0) {
        return (
            <div className="bg-primary bg-opacity-80 rounded-2xl flex flex-col items-center p-2">
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
