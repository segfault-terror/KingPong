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
import { useSocket } from '@/contexts/SocketContext';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { set } from 'react-hook-form';
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Props = {
    me: any;
    setMatchmaking: (matchmaking: boolean) => void;
};

function getAnimations(isDesktop: boolean) {
    const MobileAnimations = [
        'animate-slide-up-gate',
        'animate-slide-down-gate',
        'animate-slide-left-gate',
        'animate-slide-right-gate',
        'animate-slide-up-player',
        'animate-slide-down-opponent',
    ];
    const DesktopAnimations = [
        'animate-slide-up-gate',
        'animate-slide-down-gate',
        'animate-slide-left-gate',
        'animate-slide-right-gate',
        'animate-slide-left-player',
        'animate-slide-right-opponent',
    ];
    return isDesktop ? DesktopAnimations : MobileAnimations;
}

export default function MatchMaking({ me, setMatchmaking }: Props) {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const [animations, setAnimations] = useState(['', '', '', '', '', '']);
    const { socket } = useSocket();
    const [oppdata, setData] = useState('');
    useEffect(() => {
        if (socket) {
            socket?.on(
                'matchmakingfound',
                ({
                    matchmaking,
                    opponent,
                }: {
                    matchmaking: boolean;
                    opponent: string;
                }) => {
                    if (matchmaking) {
                        console.log('matchmaking found');
                        setAnimations(getAnimations(isDesktop));
                        setData(opponent);
                        setTimeout(() => {
                            setMatchmaking(false);
                        }, 3000);
                    }
                },
            );

            return () => {
                socket?.off('matchmakingfound');
            };
        }
    }, [socket]);

    const [newOpponent, setNewOpponent] = useState({
        username: '',
        avatar: '',
    });
    const { data: opponent, isLoading } = useQuery(
        ['opponent', oppdata],
        async () => {
            if (!oppdata) return null;
            const { data } = await axios.get(`/api/user/get/${oppdata}`);
            return data;
        },
    );

    useEffect(() => {
        if (opponent) {
            const { username, avatar } = opponent;
            setNewOpponent({ username, avatar });
        }
    }, [opponent]);
    // if (isLoading) return <div>Loading...</div>;

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
                className={`lg:object-cover h-full lg:hidden ${animations[0]}`}
            />
            <img
                src={LeftImg.src}
                alt="Left Side"
                className={`hidden lg:inline lg:object-cover lg:w-full ${animations[2]}}`}
            />

            <div className={`self-center ${animations[4]} z-20 absolute`}>
                <PlayerCard img={me.avatar} name={me.username} />
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
            <div className={`self-center ${animations[5]} z-10 absolute`}>
                <PlayerCard
                    img={newOpponent.avatar}
                    name={newOpponent.username}
                />
            </div>

            <img
                src={BottomImg.src}
                alt="Bottom Side"
                className={`lg:object-cover h-full lg:hidden ${animations[1]}`}
            />
            <img
                src={RightImg.src}
                alt="Right Side"
                className={`hidden lg:inline lg:object-cover lg:w-full ${animations[3]}`}
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
