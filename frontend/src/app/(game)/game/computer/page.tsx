'use client';
import React, { KeyboardEvent, use, useEffect } from 'react';
import dynamic from 'next/dynamic';
import p5Types from 'p5';

import { setup, draw, mousePressed, mouseReleased } from './p5Matter';
import { Socket, io } from 'socket.io-client';
import Loading from '@/app/loading';
import { Vector } from 'matter-js';
import Link from 'next/link';

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
    obstacles: { x: number; y: number; width: number; height: number }[];
}

interface Data {
    ballPos: Vector;
    topPaddlePos: Vector;
    bottomPaddlePos: Vector;
    obstaclesPos: Vector[];
}

export let pos: Data;

let screenDim = {
    width: 0,
    height: 0,
};

export default function Page() {
    const [ready, setReady] = React.useState(false);
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
            pos = data;
        });

        async function connect() {
            // await delai(1500);
            socket.connect();
            socket.emit('join-game', { game: 'computer', mode: 'normal' });
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
    useEffect(() => {
        screenDim = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        if (!ready) return;
        let serverClientRatioW = 1;
        let serverClientRatioH = 1;
        if (screenDim.width < init.width || screenDim.height < init.height) {
            const w = init.width;
            const h = init.height;
            const ratio = init.width / init.height;

            if (screenDim.width < init.width) {
                console.log(screenDim.width, init.width);
                init.width = screenDim.width * 0.9;
                init.height = init.width / ratio;
            }
            if (screenDim.height * 0.8 < init.height) {
                init.height = screenDim.height * 0.8;
                init.width = init.height * ratio;
            }
            serverClientRatioW = init.width / w;
            serverClientRatioH = init.height / h;
        }

        setServerClientRatio({
            width: serverClientRatioW,
            height: serverClientRatioH,
        });
    }, [ready]);
    if (!ready) return <Loading />;

    return (
        <>
            <header className="p-3 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                    <Link href="/home" className="block w-56">
                        <img
                            src="/images/logo.svg"
                            className="w-56 h-auto md:w-56"
                            alt="logo"
                        />
                    </Link>
                </div>
            </header>
            <div className="flex flex-col md:flex-row justify-center items-center h-screen backdrop-blur-[1px] m-auto">
                <div className="self-start rounded-l-full w-1/2 p-2 bg-primary border-2 border-secondary-500 flex  justify-between items-center px-2 mx-3 drop-shadow-[0px_0px_10px_#FF0B0B]">
                    <img
                        src="/images/bot.png"
                        alt=""
                        className="h-10 w-10 md:h-24 md:w-24 rounded-full place-items-start"
                    />
                    <h1 className="text-2xl md:text-3xl text-black font-jockey font-bold text-center">
                        dr.bot
                    </h1>
                </div>
                <Sketch
                    className="border-4 border-secondary-500 rounded-lg overflow-hidden bg-gradient-to-br from-primary to-background
                     drop-shadow-[0px_0px_15px_#ffa62a] backdrop-blur-md my-1 z-20"
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
                />
                <div className="self-end rounded-r-full w-1/2 p-2 bg-primary border-2 border-secondary-500 flex  justify-between items-center px-2 mx-3 drop-shadow-[0px_0px_10px_#03CE18]">
                    <h1 className="text-2xl md:text-3xl text-black font-jockey font-bold text-center">
                        Akashi
                    </h1>
                    <img
                        src="/images/bot.png"
                        alt=""
                        className="h-10 w-10 md:h-24 md:w-24 rounded-full place-items-start"
                    />
                </div>
            </div>
        </>
    );
}
