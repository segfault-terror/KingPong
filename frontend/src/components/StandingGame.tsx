import Link from 'next/link';
import Logo from './Logo';

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

import MyImage from '/Users/aaggoujj/Documents/photo/IMG_6282.jpeg';

const YouWin = () => {
    return (
        <div className='flex flex-row justify-between items-center'>
            <div className="grid grid-col-4 gap-2 justify-center items-center mt-4">
                <div className=" flex justify-center col-span-4">
                    <p className="text-4xl text-secondary-200 font-nicomoji">
                        You
                    </p>
                    <p className="text-4xl text-white font-nicomoji">
                        &nbsp;Win
                    </p>
                </div>
                <div className="row-span-2 flex justify-center items-center col-span-4">
                    <img src={MyImage.src} alt="" className="rounded-full w-1/2 border-4 border-secondary-200" />
                </div>
                <div className="col-start-2 col-span-2 relative">
					<div className='h-28 w-24 bg-gray-300 blur-sm opacity-20'>

					</div>
					<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center'>
						<Link className="w-20 h-6 bg-green-400 rounded-lg" href="#">

						</Link>
						<Link className="m-2 w-20 h-6 bg-gray-400 rounded-lg" href="#">

						</Link>
						<Link className="w-20 h-6 bg-red-400 rounded-lg" href="#">

						</Link>
					</div>
				</div>
                <div className="row-span-2 flex justify-center items-center col-span-4">
                    <img src={MyImage.src} alt="" className="rounded-full w-1/3 border-4 border-gray-400" />
                </div>
            </div>
        </div>
    );
};

const YouLose = () => {
    return <div> you lose </div>;
};

export default function StandingGame(props: StandingGameResult) {
    if (props.youWin === true) return <div>{YouWin()}</div>;
    else return <div>{YouLose()}</div>;
}
