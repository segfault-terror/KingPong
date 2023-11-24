/* eslint-disable @next/next/no-img-element */

import PlayerCard from './PlayerCard';

import BottomImg from '@/../public/images/MatchMacking_b.svg';
import LeftImg from '@/../public/images/MatchMacking_l.svg';
import RightImg from '@/../public/images/MatchMacking_r.svg';
import TopImg from '@/../public/images/MatchMacking_t.svg';
import VsDesktop from '@/../public/images/VS-Desktop.svg';
import VsMobile from '@/../public/images/VS-Mobile.svg';
import { useSocket } from '@/contexts/SocketContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoIosExit } from 'react-icons/io';

type Props = {
    me: any;
    setMatchmaking: (matchmaking: boolean) => void;
    oppData: any;
    setOppData: (data: any) => void;
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

export default function MatchMaking({
    me,
    setMatchmaking,
    oppData,
    setOppData,
}: Props) {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const [animations, setAnimations] = useState(['', '', '', '', '', '']);
    const { socket } = useSocket();
    const [CancelMatchmaking, setCancelMatchmaking] = useState(false);
    const clientquery = useQueryClient();
    useEffect(() => {
        if (socket) {
            socket.on(
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
                        setOppData(opponent);
                        clientquery.invalidateQueries(['opponent']);
                        clientquery.invalidateQueries([opponent]);
                        clientquery.invalidateQueries(['me']);
                        setTimeout(() => {
                            setMatchmaking(false);
                        }, 4000);
                    }
                },
            );
            socket.on('game-stop', (data) => {
                console.log('finished:', data);
                window.location.href = '/game/standing';
            });
            return () => {
                socket.off('matchmakingfound');
            };
        }
    }, [isDesktop, setMatchmaking, setOppData, socket, clientquery]);

    useEffect(() => {
        if (CancelMatchmaking) {
            console.log('cancel matchmaking');
            socket?.emit('cancel-matchmaking', { username: me.username });
            redirect('/home');
        }
    }, [CancelMatchmaking, me.username, socket]);

    const [newOpponent, setNewOpponent] = useState({
        username: '',
        avatar: '',
    });
    const { data: opponent } = useQuery(['opponent', oppData], async () => {
        if (!oppData) return null;
        const { data } = await axios.get(`/api/user/get/${oppData}`);
        return data;
    });

    const [timer, setTimer] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (opponent) {
            const { username, avatar } = opponent;
            setNewOpponent({ username, avatar });
        }
    }, [opponent]);

    return (
        <div
            className="bg-gradient-to-r lg:bg-gradient-to-b from-background via-primary to-background
                h-screen
                overflow-hidden
                flex flex-col lg:flex-row justify-center"
        >
            <button
                type="button"
                title="return to dashboard"
                className="w-16 h-16 rounded-full absolute left-1 bottom-2"
            >
                <IoIosExit
                    className="text-3xl text-secondary-200 w-16 h-16 rounded-full bg-secondary-100 hover:text-background hover:bg-secondary-200 transition-all duration-300 ease-in-out"
                    onClick={() => {
                        setCancelMatchmaking(true);
                    }}
                />
            </button>
            <img
                src={TopImg.src}
                alt="Top Side"
                className={`lg:object-cover h-full lg:hidden ${animations[0]}`}
            />
            <img
                src={LeftImg.src}
                alt="Left Side"
                className={`hidden lg:inline lg:object-cover lg:w-full ${animations[2]}`}
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
            {animations[0] === '' && (
                <p className="absolute bottom-4 right-4 text-2xl">
                    <span className="text-secondary-200 font-jockey text-center text-4xl underline-offset-1">
                        waiting {timer} {'s  '}
                    </span>
                    <div className="inline-block w-4 h-4 rounded-full bg-secondary-200 lg:w-4 lg:h-4 animate-first-dot" />
                    <div className="inline-block w-4 h-4 mx-1 rounded-full bg-secondary-200 lg:w-4 lg:h-4 animate-second-dot" />
                    <div className="inline-block w-4 h-4 rounded-full bg-secondary-200 lg:w-4 lg:h-4 animate-third-dot" />
                </p>
            )}
        </div>
    );
}
