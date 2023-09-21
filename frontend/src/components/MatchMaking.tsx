/* eslint-disable @next/next/no-img-element */

import PlayerCard from './PlayerCard';

import Archer from '../stories/assets/2.jpeg';

type Props = {
    topImg: string;
    bottomImg: string;
};

export default function MatchMaking({ topImg, bottomImg }: Props) {
    return (
        <div
            className="bg-gradient-to-r from-background via-primary to-background
                h-screen
                border-4 border-[red]
                overflow-hidden
                flex flex-col justify-center"
        >
            <img
                src={topImg}
                alt="Top Side"
                className="border-4 border-[yellow] object-cover h-full translate-y-[-40%]"
            />
            <div className="self-center border-4 border-[green]">
                <PlayerCard img={Archer.src} name="Archer" />
            </div>
            <div className="self-center border-4 border-[green]">
                <PlayerCard img={Archer.src} name="Archer" />
            </div>
            <img
                src={bottomImg}
                alt="Bottom Side"
                className="border-4 border-[yellow] object-cover h-full translate-y-[40%]"
            />
        </div>
    );
}
