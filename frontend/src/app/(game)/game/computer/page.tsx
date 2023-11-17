'use client';
import React, { KeyboardEvent, use, useEffect } from 'react';
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

export interface InitData {
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
    useEffect(() => {
        screenDim = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    });
    if (!ready) return <Loading />;

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

    const serverClientRatio = {
        width: serverClientRatioW,
        height: serverClientRatioH,
    };

    console.log(serverClientRatio);

    return (
        <div className="flex justify-center items-center h-screen">
            <Sketch
                className={'border overflow-hidden'}
                setup={(p5: p5Types, canvasParentRef: Element) => {
                    setup(p5, canvasParentRef, init, serverClientRatio);
                }}
                draw={(p5: p5Types) => {
                    draw(p5, serverClientRatio, socket);
                }}
            />
        </div>
    );
}
