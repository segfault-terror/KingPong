'use client';
import React, { KeyboardEvent, use, useEffect } from 'react';
import dynamic from 'next/dynamic';
import p5Types from 'p5';

import { setup, draw, mousePressed } from './p5Matter';
import { Socket, io } from 'socket.io-client';
import Loading from '@/app/loading';
import { Vector } from 'matter-js';
import { useSocket } from '@/contexts/SocketContext';
import { set } from 'react-hook-form';
import GameOver from '@/app/(game)/game/standing/GameOver';
import { redirect } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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

export default function Game({ me, opponent }: { me: any; opponent: string }) {
    const [ready, setReady] = React.useState(false);
    const [init, setInit] = React.useState<any>(null);
    const [winner, setWinner] = React.useState('');
    const { socket } = useSocket();

    const { mutate: updateGame } = useMutation(async (data: any) => {
        const { data: res } = await axios.post('/api/game/add/match', data);
        return res;
    });

    useEffect(() => {
        if (socket) {
            console.log('socket exists: ', socket);
            socket.on('canvas', (data) => {
                console.log('canvas');
                console.log(me);
                console.log(opponent);
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
                // console.log(data);
                if (data.username === me.username) {
                    pos = data;
                }
            });
            socket.on('opponentdisconnect', () => {
                updateGame({
                    player1: me.username,
                    player2: opponent,
                    ranked: true,
                    player1_score: 11,
                    player2_score: 1,
                });
                setWinner(me.username);
            });
            return () => {
                socket.off('canvas');
                socket.off('update-game');
                socket.off('disconnect');
            };
        }
    }, [socket]);
    useEffect(() => {
        if (winner !== '') {
            setWinner('');
            redirect('/game/standing');
        }
    }, [winner]);

    if (!ready) return <Loading />;
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <Sketch
                    className={
                        'border border-red-700 rounded-3xl overflow-hidden'
                    }
                    setup={(p5: p5Types, canvasParentRef: Element) => {
                        setup(p5, canvasParentRef, init.width, init.height);
                    }}
                    draw={(p5: p5Types) => {
                        socket && draw(p5, me.username, socket);
                    }}
                />
            </div>
        </>
    );
}
