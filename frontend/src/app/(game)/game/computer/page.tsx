'use client';
import React, { KeyboardEvent, useEffect } from 'react';
import dynamic from 'next/dynamic';
import p5Types from 'p5';

import { setup, draw, mousePressed } from './p5Matter';
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
    const [init, setInit] = React.useState<any>(null);

    useEffect(() => {
        const socket = io(`/game`, {
            withCredentials: true,
            path: '/api/socket',
            autoConnect: false,
        });
        setSocket(socket);
        // socket.on('connect', () => {
        //     setReady(true);
        // });
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
            await delai(1500);
            socket.connect();
        }
        if (!socket.connected) connect();

        // const handlePress = (e: React.KeyboardEvent) => {
        //     if (!socket.connected) return;

        //     if (e.key === 'ArrowLeft') {
        //         socket.emit('press-left');
        //     }
        //     if (e.key === 'ArrowRight') {
        //         socket.emit('press-right');
        //     }
        // };
        // const handleRelase = (e: React.KeyboardEvent) => {
        //     if (!socket.connected) return;

        //     if (e.key === 'ArrowLeft') {
        //         socket.emit('relase-left');
        //     }
        //     if (e.key === 'ArrowRight') {
        //         socket.emit('relase-right');
        //     }
        // };

        // window.addEventListener('keypress', handlePress as any);
        // window.addEventListener('keyup', handleRelase as any);

        return () => {
            socket.off('connect');
            socket.off('canvas');
            socket.off('update-game');
            socket.disconnect();
            // window.removeEventListener('keydown', handlePress as any);
            // window.removeEventListener('keyup', handleRelase as any);
        };
    }, [ready]);
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
