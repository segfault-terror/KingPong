import Link from 'next/link';
import Logo from './Logo';

import FirstPlace from '../../public/images/FirstPlace.svg';
import SecondPlace from '../../public/images/SecondPlace.svg';

type Player = {
    name: string;
    image: string;
};

type StandingGameResult = {
    me?: Player;
    opp?: Player;
    youWin?: boolean;
    result?: string;
};

const Winner = (image: string) => {
    return (
        <div className="row-span-3 flex flex-col justify-between items-center col-span-4 border-2 border-yellow-300 relative h-48">
            <img
                src={image}
                alt=""
                className="rounded-full h-36 border-4 border-secondary-200 z-10"
            />
            <img
                src={FirstPlace.src}
                alt="FirstPlace"
                className="absolute animate-[TranslateYDown_1.5s_linear] h-12 border-2 flex justify-end items-end bottom-0 z-0"
            />
        </div>
    );
};

const Loser = (image: string) => {
    return (
        <div className="row-span-3 flex flex-col justify-between items-center col-span-4 border-2 border-gray-500 relative h-32">
            <img
                src={image}
                alt=""
                className="rounded-full h-24 border-4 border-gray-500 z-10 flex justify-start items-start"
            />
            <img
                src={SecondPlace.src}
                alt="SecondPlace"
                className="absolute animate-[TranslateYDown_1.5s_linear] h-8 border-2 flex justify-end items-end bottom-0 z-0"
            />
        </div>
    );
};

const YouWin = () => {
    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <div className="grid grid-col-4 gap-4 justify-center items-center mt-4">
                <div className=" flex justify-center col-span-4 border border-green-400">
                    <p className="text-3xl text-secondary-200 font-nicomoji">
                        You
                    </p>
                    <p className="text-3xl text-white font-nicomoji">
                        &nbsp;Win
                    </p>
                </div>
                {Winner(
                    'https://cdn.intra.42.fr/users/90acb3217b4be8350fa9f9fc32dd2200/aaggoujj.jpg',
                )}
                <div className="col-start-2 col-span-2 relative">
                    <div className="h-32 w-32 bg-[#868686] shadow-inner opacity-10 rounded-lg "></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center font-nicomoji text-center text-black text-sm">
                        <Link
                            className="w-24 h-8  rounded-lg border-t-2 border-b-2 border-gray-600 bg-gradient-radial from-secondary-200 to-secondary-500"
                            href="#"
                        >
                            Rematch
                        </Link>
                        <Link
                            className="m-2 w-24 h-8 bg-gradient-radial from-green-400 to-green-700 rounded-lg border-t-2 border-b-2"
                            href="#"
                        >
                            New Game
                        </Link>
                        <Link
                            className="w-24 h-8 bg-gradient-radial from-inactive-200 to-inactive-500 rounded-lg border-t-2 border-b-2"
                            href="/dashboard"
                        >
                            Exit
                        </Link>
                    </div>
                </div>
                {Loser(
                    'https://cdn.intra.42.fr/users/90acb3217b4be8350fa9f9fc32dd2200/aaggoujj.jpg',
                )}
            </div>
        </div>
    );
};

const YouLose = () => {
    return <div> you lose </div>;
};

export default function StandingGame(props: StandingGameResult) {
    if (props.youWin === true)
        return (
            <div className="flex justify-center items-center StandingBg">
                {YouWin()}
            </div>
        );
    else return <div>{YouLose()}</div>;
}
