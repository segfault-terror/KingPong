'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import p5Types from 'p5';

import {
    setup,
    draw,
    mousePressed,
    mouseReleased,
    updatePos,
} from './p5Matter';
import { Socket, io } from 'socket.io-client';
import Loading from '@/app/loading';
import { Vector } from 'matter-js';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { IoIosExit } from 'react-icons/io';
import ExitGameModal from '@/components/ExitGameModal';
import { CardPlayerBottom, CardPlayerTop } from '@/components/CardPlayer';
import useMyData from '@/hooks/useMyData';

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
    obstacles: {width: number; height: number }[];
}

export interface Data {
    ballPos: Vector;
    topPaddlePos: Vector;
    bottomPaddlePos: Vector;
    obstaclesPos: Vector[];
    yourScore: number;
    opponentScore: number;
}

let screenDim = {
    width: 0,
    height: 0,
};

export default function Page({params}: { params: {mode: string} }) {
    const isSmartWatch = useMediaQuery('(max-width: 300px)');
    const [isMobile, setIsMobile] = React.useState('');
    const [ready, setReady] = React.useState(false);
    const [matchCancel, setMatchCancel] = React.useState(false);
    const [exitGameModal, setExitGameModal] = React.useState(false);
    const [socket, setSocket] = React.useState<Socket | undefined>(undefined);
    const [init, setInit] = React.useState<InitData>({
        width: 0,
        height: 0,
        frameRate: 0,
        topPaddle: { width: 0, height: 0 },
        bottomPaddle: { width: 0, height: 0 },
        ball: { radius: 0 },
        obstacles: [],
    });
    const [serverClientRatio, setServerClientRatio] = React.useState({
        width: 1,
        height: 1,
    });
    const { me } = useMyData();
    useEffect(() => {
        const socket = io(`/game`, {
            withCredentials: true,
            path: '/api/socket',
            autoConnect: false,
        });
        setSocket(socket);
        socket.on('canvas', (data) => {
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
            updatePos(data);
        });

        async function connect() {
            // await delai(1500);
            socket.connect();
            socket.emit('join-game', { game: 'computer', mode: params.mode });
        }
        if (!socket.connected) connect();

        // socket.on('disconnect', () => {
        //     window.location.href = '/home';
        // });

        return () => {
            socket.off('connect');
            socket.off('canvas');
            socket.off('update-game');
            socket.disconnect();
        };
    }, []);
    const [{ w, h }, setDim] = React.useState({ w: '', h: '' });
    useEffect(() => {
        if (isSmartWatch) setIsMobile('hidden');
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

            if (screenDim.width - 48 < init.width) {
                init.width = screenDim.width * 0.9;
                init.height = init.width / ratio;
            }
            if (screenDim.height * 0.7 < init.height) {
                init.height = (screenDim.height - 48) * 0.7;
                init.width = init.height * ratio;
            }
            serverClientRatioW = init.width / w;
            serverClientRatioH = init.height / h;
        }

        setServerClientRatio({
            width: serverClientRatioW,
            height: serverClientRatioH,
        });
        const w = 600 * serverClientRatioW;
        const h = 800 * serverClientRatioH;
        setDim({ w: `w-[${w}px]`, h: `h-[${h}px]` });
    }, [ready]);

    useEffect(() => {
        if (matchCancel) window.location.href = `/home`;
    });
    if (!ready) return <Loading />;
    let isPaused = false;
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
                            username={'Dr. Boot'}
                            avatar={'/images/bot.png'}
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
                        className={`border-4 border-secondary-500 rounded-lg overflow-hidden bg-gradient-to-br from-primary to-background ${w} ${h}
                     drop-shadow-[0px_0px_15px_#ffa62a] backdrop-blur-md my-1 z-20`}
                        setup={(p5: p5Types, canvasParentRef: Element) => {
                            setup(p5, canvasParentRef, init, serverClientRatio);
                        }}
                        draw={(p5: p5Types) => {
                            draw(p5, serverClientRatio, socket);
                        }}
                        mousePressed={(p5: p5Types) => {
                            mousePressed(p5);
                        }}
                        mouseReleased={(p5: p5Types) => {
                            mouseReleased(p5);
                        }}
                        keyPressed={(p5: p5Types) => {
                            const SPACE_KEY = 32;
                            if (p5.keyCode === SPACE_KEY) {
                                if (isPaused) {
                                    p5.loop();
                                    isPaused = false;
                                    socket?.emit('resume-game');
                                } else {
                                    p5.noLoop();
                                    isPaused = true;
                                    socket?.emit('pause-game');
                                }
                            }
                        }}
                    />

                    <CardPlayerBottom
                        isMobile={isMobile}
                        username={me.username}
                        avatar={me.avatar}
                    />
                </div>
            )}
        </>
    );
}
