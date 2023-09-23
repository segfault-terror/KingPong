/* eslint-disable @next/next/no-img-element */

import PlayerCard from './PlayerCard';

import Archer from '../../../../public/images/2.jpeg';
import Tommy from '../../../../public/images/1.jpeg';

type Props = {
    topImg: string;
    bottomImg: string;
    rightImg: string;
    leftImg: string;
};

export default function MatchMaking({
    topImg,
    bottomImg,
    rightImg,
    leftImg,
}: Props) {
    return (
        <div
            className="bg-gradient-to-r lg:bg-gradient-to-b from-background via-primary to-background
                h-screen
                border-4 border-[red]
                overflow-hidden
                flex flex-col lg:flex-row justify-center"
        >
            <img
                src={topImg}
                alt="Top Side"
                className="border-4 border-[yellow] object-cover h-full translate-y-[-40%] lg:hidden"
            />
            <img
                src={leftImg}
                alt="Left Side"
                className="lg:border-4 lg:border-[yellow] hidden lg:inline lg:object-cover lg:w-full"
            />
            <div className="self-center border-4 border-[green]">
                <PlayerCard img={Tommy.src} name="Tommy" />
            </div>
            {/* <div className="self-center border-4 border-[green]">
                <PlayerCard img={Archer.src} name="Archer" />
            </div> */}
            <img
                src={bottomImg}
                alt="Bottom Side"
                className="border-4 border-[yellow] object-cover h-full translate-y-[40%] lg:hidden"
            />
            <img
                src={rightImg}
                alt="Right Side"
                className="lg:border-4 lg:border-[yellow] hidden lg:inline lg:object-cover lg:w-full"
            />
        </div>
    );
}