import Modal from '@/components/Modal';
import Link from 'next/link';
import { useState } from 'react';

type SelectModeProps = {
    mode: string;
    images: string;
    link: string;
    title: string;
};

export default function SelectMode({
    mode,
    images,
    link,
    title,
}: SelectModeProps) {
    const [showGameMode, setShowGameMode] = useState(false);
    return (
        <div className=" h-72 md:h-96  flex flex-col justify-center items-center group">
            <button
                // href={link}
                onClick={() => {
                    setShowGameMode(true);
                }}
                className="w-full rounded-xl flex justify-center items-center opacity-80 group-hover:opacity-100 hover:drop-shadow-neon-white"
            >
                <img
                    src={`/images/${images}.svg`}
                    alt=""
                    className="w-[80%] xl:w-[600px]"
                />
            </button>
            <button
                // href={link}
                onClick={() => {
                    setShowGameMode(true);
                }}
                type="button"
                title={title}
                className="flex items-center justify-center w-32 h-12 lg:w-36 lg:h-14 border-t-4 border-b-4 rounded-3xl border-opponent bg-secondary-500 text-black font-nicomoji group-hover:opacity-100  hover:bg-secondary-200 hover:border-white "
            >
                {mode}
            </button>
            {showGameMode && (
                <Modal
                    onClose={() => setShowGameMode(false)}
                    childrenClassName="bg-gradient-to-br from-primary to-background p-6 rounded-2xl border-r-2 border-l-2 border-secondary-500 w-[90%]
                max-w-[900px] flex flex-col justify-evenly"
                >
                    <div className="w-full flex justify-around">
                        <div className="flex flex-col items-center gap-3">
                            <Link
                                href={`${link}/normal`}
                                className="hover:drop-shadow-neon-white"
                            >
                                <img
                                    src={`/images/normal.png`}
                                    alt=""
                                    className="w-[80%] md:w-[400px] rounded-3xl overflow-hidden"
                                />
                            </Link>
                            <Link
                                href={`${link}/normal`}
                                className="flex items-center justify-center w-32 h-12 lg:w-36 lg:h-14 border-t-4 border-b-4 rounded-3xl border-opponent bg-secondary-500 text-black font-nicomoji group-hover:opacity-100  hover:bg-secondary-200 hover:border-white"
                            >
                                Normal
                            </Link>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <Link
                                href={`${link}/obstacle`}
                                className="hover:drop-shadow-neon-white"
                            >
                                <img
                                    src={`/images/obstacle.png`}
                                    alt=""
                                    className="w-[80%] md:w-[400px] rounded-3xl overflow-hidden"
                                />
                            </Link>
                            <Link
                                href={`${link}/obstacle`}
                                className="flex items-center justify-center w-32 h-12 lg:w-36 lg:h-14 border-t-4 border-b-4 rounded-3xl border-opponent bg-secondary-500 text-black font-nicomoji group-hover:opacity-100  hover:bg-secondary-200 hover:border-white"
                            >
                                Obstacle
                            </Link>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
