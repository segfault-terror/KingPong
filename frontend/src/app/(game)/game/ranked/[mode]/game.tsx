'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import p5Types from 'p5';

import { setup, draw, mousePressed, mouseReleased, setPos } from './p5Matter';
import Loading from '@/app/loading';
import { Vector } from 'matter-js';
import { useSocket } from '@/contexts/SocketContext';
import { redirect } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Modal from '@/components/Modal';
import { IoIosExit } from 'react-icons/io';
import { CardPlayerBottom, CardPlayerTop } from '@/components/CardPlayer';
import ExitGameModal from '@/components/ExitGameModal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import axios from 'axios';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

const delai = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface InitData {
    width: number;
    height: number;
    frameRate: number;
    topPaddle: { width: number; height: number };
    bottomPaddle: { width: number; height: number };
    ball: { radius: number };
    obstacles: { width: number; height: number }[];
}

export interface Data {
    ballPos: Vector;
    topPaddlePos: Vector;
    bottomPaddlePos: Vector;
    obstaclesPos: Vector[];
    score: { top: number; bottom: number };
}

let screenDim = {
    width: 0,
    height: 0,
};

export default function Game({ me, opponent }: { me: any; opponent: string }) {
    const [ready, setReady] = React.useState(false);
    const [init, setInit] = React.useState<any>(null);
    const [winner, setWinner] = React.useState('');
    const [gameOver, setGameOver] = React.useState(false);
    const [matchCancel, setMatchCancel] = React.useState(false);
    const [exitGameModal, setExitGameModal] = React.useState(false);
    const isSmartWatch = useMediaQuery('(max-width: 300px)');
    const [isMobile, setIsMobile] = React.useState('');
    const [serverClientRatio, setServerClientRatio] = React.useState({
        width: 1,
        height: 1,
    });
    const { socket } = useSocket();

    const queryClient = useQueryClient();

    const { data: opponentData, isLoading } = useQuery({
        queryKey: ['profile', opponent, 'me'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/user/get/${opponent}`, {
                withCredentials: true,
            });

            return data;
        },
    });

    useEffect(() => {
        if (socket) {
            socket.on('canvas', (data) => {
                console.log('canvas');
                setInit({
                    width: data.canvas.width,
                    height: data.canvas.height,
                    frameRate: data.frameRate,
                    topPaddle: data.topPaddle,
                    bottomPaddle: data.bottomPaddle,
                    ball: data.ball,
                    obstacles: data.obstacles,
                });
                setReady(true);
            });
            socket.on('update-game', (data) => {
                if (data.username === me.username) {
                    setPos(data);
                }
            });
            socket.on('game-stop', (data) => {
                queryClient.invalidateQueries(['me']);
                queryClient.invalidateQueries(['leaderboard']);
                console.log('opponent disconnected');
                setGameOver(true);
                setTimeout(() => {
                    setWinner(me.username);
                }, 2000);
            });
            socket.on('finished', (data) => {
                queryClient.invalidateQueries(['me']);
                queryClient.invalidateQueries(['leaderboard']);
                console.log('finished');
                setGameOver(true);
                setTimeout(() => {
                    setWinner(data.winner);
                    socket.disconnect();
                }, 2000);
            });
            socket.on('disconnect', () => {
                console.log('disconnected');
                queryClient.invalidateQueries(['me']);
                queryClient.invalidateQueries(['leaderboard']);
                setGameOver(true);
                setTimeout(() => {
                    setWinner(me.username);
                }, 2000);
            });
            return () => {
                socket.off('canvas');
                socket.off('update-game');
                socket.off('disconnect');
            };
        }
    }, []);
    useEffect(() => {
        screenDim = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        if (!ready) return;
        let serverClientRatioW = 1;
        let serverClientRatioH = 1;
        if (
            screenDim.width < init.width ||
            screenDim.height * 0.7 < init.height
        ) {
            const w = init.width;
            const h = init.height;
            const ratio = init.width / init.height;

            if (screenDim.width < init.width) {
                init.width = screenDim.width * 0.9;
                init.height = init.width / ratio;
            }
            if (screenDim.height * 0.7 < init.height) {
                init.height = screenDim.height * 0.7;
                init.width = init.height * ratio;
            }
            serverClientRatioW = init.width / w;
            serverClientRatioH = init.height / h;
        }
        if (isSmartWatch) setIsMobile('hidden');
        setServerClientRatio({
            width: serverClientRatioW,
            height: serverClientRatioH,
        });
    }, [ready]);
    useEffect(() => {
        if (winner !== '') {
            redirect('/game/standing');
        }
        if (matchCancel) redirect('/home');
    }, [winner, matchCancel]);

    if (!ready || isLoading) return <Loading />;

    return (
        <>
            {exitGameModal ? (
                <ExitGameModal
                    setExitGameModal={setExitGameModal}
                    setMatchCancel={setMatchCancel}
                />
            ) : (
                <div className="flex flex-col justify-evenly h-full items-center backdrop-blur-[1px] m-auto">
                    <div className="flex justify-between items-center w-full">
                        <CardPlayerTop
                            isMobile={isMobile}
                            username={opponentData.username}
                            avatar={opponentData.avatar}
                        />
                        <button
                            type="button"
                            title="return to dashboard"
                            className="w-16 h-16 rounded-full"
                        >
                            <IoIosExit
                                className="text-3xl text-secondary-200 w-16 h-16 rounded-full bg-secondary-100 hover:text-background hover:bg-secondary-200 transition-all duration-300 ease-in-out"
                                onClick={() => {
                                    setExitGameModal(true);
                                }}
                            />
                        </button>
                    </div>
                    <Sketch
                        className="border-4 border-secondary-500 rounded-lg overflow-hidden bg-gradient-to-br from-primary to-background ${w} ${h}
                        drop-shadow-[0px_0px_15px_#ffa62a] backdrop-blur-md my-1 z-20"
                        setup={(p5: p5Types, canvasParentRef: Element) => {
                            setup(p5, canvasParentRef, init, serverClientRatio);
                        }}
                        mousePressed={(p5: p5Types) => {
                            mousePressed(p5);
                        }}
                        mouseReleased={(p5: p5Types) => {
                            mouseReleased(p5);
                        }}
                        draw={(p5: p5Types) => {
                            socket &&
                                draw(
                                    p5,
                                    serverClientRatio,
                                    me.username,
                                    socket,
                                );
                        }}
                    />
                    <CardPlayerBottom
                        isMobile={isMobile}
                        username={me.username}
                        avatar={me.avatar}
                    />
                    {gameOver && (
                        <Modal
                            onClose={() => {}}
                            childrenClassName="text-5xl font-nicomoji text-center font-jost text-2xl flex justify-center items-center rounded-xl backdrop-blur-lg text-transparent bg-clip-text bg-gradient-radial from-secondary-200 from-40% to-red-500"
                        >
                            Game Over!
                        </Modal>
                    )}
                </div>
            )}
        </>
    );
}
