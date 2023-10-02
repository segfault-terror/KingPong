import Link from 'next/link';
import Logo from './Logo';

import FirstPlace from '../../public/images/FirstPlace.svg';
import SecondPlace from '../../public/images/SecondPlace.svg';

type StandingGameResult = {
    myimage: string;
    oppimage: string;
    youWin: boolean;
};

const Winner = (image: string) => {
    return (
        <div className="flex flex-col justify-between items-center col-span-4 border-yellow-300 relative h-52 md:h-64 lg:h-72 xl:h-80">
            <img
                src={image}
                alt=""
                className="rounded-full h-32 md:h-44 lg:h-52 xl:h-56 border-4 border-secondary-200 z-10 drop-shadow-neon-orange"
            />
            <img
                src={FirstPlace.src}
                alt="FirstPlace"
                className="animate-[TranslateYDown_1.5s_linear] h-12 md:h-16 lg:h-20 xl:h-24  flex justify-end items-end bottom-0 z-0 drop-shadow-neon-orange"
            />
            <div className="animate-[wiggle_1.5s_linear]">
                <img src="/images/StandingShadowFirst.svg" alt="" />
            </div>
        </div>
    );
};

const Loser = (image: string) => {
    return (
        <div className="flex flex-col justify-between items-center col-span-4 relative md:h-44 h-36 lg:h-52 xl:64">
            <img
                src={image}
                alt=""
                className="rounded-full md:h-32 h-24 lg:h-36 xl:h-44 border-4 border-gray-500 z-10 flex justify-start items-start drop-shadow-[0px_0px_20px_#868686]"
            />
            <img
                src={SecondPlace.src}
                alt="SecondPlace"
                className=" animate-[TranslateYDown_1.5s_linear] md:h-12 h-8 lg:h-16 xl:20 flex justify-end items-end z-0 drop-shadow-[0px_0px_10px_#868686]"
            />
            <div className="animate-[wiggle_1.5s_linear]">
                <img src="/images/StandingShadowSecond.svg" alt="" />
            </div>
        </div>
    );
};

const YouWin = (myimage: string, oppimage: string) => {
    return (
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-4 relative">
            {Winner(myimage)}
            <div className="relative lg:mx-16 xl:mx-24">
                <div className="h-32 w-32  md:h-48 md:w-44 bg-[#868686] shadow-inner opacity-10 rounded-lg md:rounded-xl "></div>
                <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center font-nicomoji text-center text-black text-sm">
                    <Link
                        className="w-24 h-8 md:w-36 md:h-12 md:text-lg  rounded-lg lg:rounded-2xl border-t-2 border-b-2 border-gray-600 bg-gradient-radial from-secondary-200 to-secondary-500 flex justify-center items-center"
                        href="#"
                    >
                        Rematch
                    </Link>
                    <Link
                        className="m-2 w-24 h-8 md:w-36 md:h-12 md:text-lg bg-gradient-radial from-green-400 to-green-700 rounded-lg lg:rounded-2xl border-t-2 border-b-2 flex justify-center items-center"
                        href="#"
                    >
                        New Game
                    </Link>
                    <Link
                        className="w-24 h-8 md:w-36 md:h-12 md:text-lg bg-gradient-radial from-inactive-200 to-inactive-500 rounded-lg lg:rounded-2xl border-t-2 border-b-2 flex justify-center items-center"
                        href="/dashboard"
                    >
                        Exit
                    </Link>
                </div>
            </div>
            {Loser(oppimage)}
            {/* </div> */}
            <div className="opacity-0 md:opacity-100 fixed right-0 bottom-0">
                <img src="/images/logo.svg" alt="logo" className="w-44" />
            </div>
        </div>
    );
};

const YouLose = (myimage: string, oppimage: string) => {
    return (
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-4 relative">
            {Loser(myimage)}
            <div className="relative mx-12">
                <div className="h-32 w-32  md:h-48 md:w-40 lg:h-56 lg:w-56 xl:h-64 xl:w-60 bg-[#868686] shadow-inner opacity-10 rounded-lg md:rounded-xl "></div>
                <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center font-nicomoji text-center text-black text-sm">
                    <Link
                        className="w-24 h-8 md:w-36 md:h-12 lg:w-44 lg:h-14 lg:text-xl xl:w-48 xl:h-16 xl:text-2xl md:text-lg  rounded-lg lg:rounded-2xl border-t-2 border-b-2 border-gray-600 hover:border-white bg-gradient-radial from-secondary-200 to-secondary-500 flex justify-center items-center"
                        href="#"
                    >
                        Rematch
                    </Link>
                    <Link
                        className="m-2 w-24 h-8 md:w-36 md:h-12 lg:w-44 lg:h-14 lg:text-xl xl:w-48 xl:h-16 xl:text-2xl md:text-lg bg-gradient-radial from-green-400 to-green-700 rounded-lg lg:rounded-2xl border-t-2 border-b-2 border-gray-600 hover:border-green-300 flex justify-center items-center"
                        href="#"
                    >
                        New Game
                    </Link>
                    <Link
                        className="w-24 h-8 md:w-36 md:h-12 lg:w-44 lg:h-14 lg:text-xl xl:w-48 xl:h-16 xl:text-2xl md:text-lg bg-gradient-radial from-inactive-200 to-inactive-500 rounded-lg lg:rounded-2xl border-t-2 border-b-2 border-gray-600 hover:border-white flex justify-center items-center"
                        href="/dashboard"
                    >
                        Exit
                    </Link>
                </div>
            </div>
            {Winner(oppimage)}
            {/* </div> */}
            <div className="opacity-0 md:opacity-100 fixed right-0 bottom-0">
                <img src="/images/logo.svg" alt="logo" className="w-44" />
            </div>
        </div>
    );
};

export default function StandingGame(props: StandingGameResult) {
    const Bg = props.youWin == true ? 'StandingBgWon ' : 'StandingBgLost';
    const color = props.youWin == true ? 'text-[#03CE18]' : 'text-[#F51F3B]';
    return (
        <div
            className={`flex flex-col justify-center items-center bg-cover bg-fixed min-h-screen ${Bg}`}
        >
            <div className="flex justify-center items-center mb-10 align-middle">
                <p className={`text-3xl md:text-6xl ${color} font-nicomoji`}>
                    You
                </p>
                <p className={`text-3xl  md:text-6xl ${color} font-nicomoji`}>
                    &nbsp;{props.youWin == true ? 'Win' : 'Lose'}
                </p>
            </div>
            <div className="flex mx-2 flex-col lg:flex-row justify-between items-center">
                {props.youWin == true
                    ? YouWin(props.myimage, props.oppimage)
                    : YouLose(props.myimage, props.oppimage)}
            </div>
        </div>
    );
}
