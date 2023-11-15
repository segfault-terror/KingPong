'use client';
import React, { KeyboardEvent, useEffect } from 'react';
import dynamic from 'next/dynamic';
import p5Types from 'p5';

import { setup, draw } from './p5Matter';
import { Socket, io } from 'socket.io-client';
import Loading from '@/app/loading';
import { Vector } from 'matter-js';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

const delai = (ms: number) => new Promise((res) => setTimeout(res, ms));

interface InitData {
    width: number;
    height: number;
    frameRate: number;
    topPaddle: { width: number; height: number };
    bottomPaddle: { width: number; height: number };
    ball: { radius: number };
}

interface Data {
    ballPos: Vector;
    topPaddlePos: Vector;
    bottomPaddlePos: Vector;
}

export let pos: Data;

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
            });
            setReady(true);
        });
        socket.on('update-game', (data) => {
            pos = data;
        });

        async function connect() {
            // await delai(1500);
            socket.connect();
            socket.emit('join-game', { game: 'computer' });
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
    if (!ready) return <Loading />;
    return (
        <div className="flex justify-center items-center h-screen">
            <Sketch
                className={'border border-red-700 rounded-3xl overflow-hidden'}
                setup={(p5: p5Types, canvasParentRef: Element) => {
                    setup(p5, canvasParentRef, init.width, init.height);
                }}
                draw={(p5: p5Types) => {
                    draw(p5, socket);
                }}
            />
        </div>
    );
}
