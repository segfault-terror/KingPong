/* eslint-disable @next/next/no-img-element */

import PlayerCard from './PlayerCard';

import VsMobile from '@/../public/images/VS-Mobile.svg';
import VsDesktop from '@/../public/images/VS-Desktop.svg';
import Ball from '@/../public/images/ball-noshadow.svg';
import TopImg from '@/../public/images/MatchMacking_t.svg';
import BottomImg from '@/../public/images/MatchMacking_b.svg';
import LeftImg from '@/../public/images/MatchMacking_l.svg';
import RightImg from '@/../public/images/MatchMacking_r.svg';
import Tommy from '@/../public/images/1.jpeg';
import Archer from '@/../public/images/2.jpeg';

type Props = {

};

export default function MatchMaking({

}: Props) {
    return (
        <div
            className="bg-gradient-to-r lg:bg-gradient-to-b from-background via-primary to-background
                h-screen
                overflow-hidden
                flex flex-col lg:flex-row justify-center"
        >
            <img
                src={TopImg.src}
                alt="Top Side"
                className="lg:object-cover h-full lg:hidden animate-slide-up-gate"
            />
            <img
                src={LeftImg.src}
                alt="Left Side"
                className="hidden lg:inline lg:object-cover lg:w-full animate-slide-left-gate"
            />

            <div className="self-center animate-slide-up-player lg:animate-slide-left-player z-20 absolute">
                <PlayerCard img={Tommy.src} name="Tommy" />
            </div>
            <img
                src={VsMobile.src}
                alt="VS"
                className="self-center w-12 h-12 absolute lg:hidden"
            />
            <img
                src={VsDesktop.src}
                alt="VS"
                className="self-center absolute hidden lg:inline"
            />
            <div className="self-center animate-slide-down-opponent lg:animate-slide-right-opponent z-10 absolute">
                <PlayerCard img={Archer.src} name="Archer" />
            </div>

            <img
                src={BottomImg.src}
                alt="Bottom Side"
                className="lg:object-cover h-full lg:hidden animate-slide-down-gate "
            />
            <img
                src={RightImg.src}
                alt="Right Side"
                className="hidden lg:inline lg:object-cover lg:w-full animate-slide-right-gate"
            />
            <p className="absolute bottom-4 right-4 text-2xl">
                <img
                    src={Ball.src}
                    alt="Ball"
                    className="inline-block w-2 h-2 lg:w-4 lg:h-4 animate-first-dot"
                />
                <img
                    src={Ball.src}
                    alt="Ball"
                    className="inline-block w-2 h-2 lg:w-4 lg:h-4 mx-2 animate-second-dot"
                />
                <img
                    src={Ball.src}
                    alt="Ball"
                    className="inline-block w-2 h-2 lg:w-4 lg:h-4 animate-third-dot"
                />
            </p>
        </div>
    );
}
