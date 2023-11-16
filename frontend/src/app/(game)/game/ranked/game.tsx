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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Modal from '@/components/Modal';

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
    score: { top: number; bottom: number };
}

export let pos: Data;

export default function Game({ me, opponent }: { me: any; opponent: string }) {
    const [ready, setReady] = React.useState(false);
    const [init, setInit] = React.useState<any>(null);
    const [winner, setWinner] = React.useState('');
    const [gameOver, setGameOver] = React.useState(false);
    const { socket } = useSocket();

    const { mutate: updateGame, isLoading } = useMutation(async (data: any) => {
        const { data: res } = await axios.post('/api/game/add/match', data);
        return res;
    });

    const queryClient = useQueryClient();

    useEffect(() => {
        if (socket) {
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
                if (data.username === me.username) {
                    pos = data;
                }
            });
            socket.on('game-stop', (data) => {
                queryClient.invalidateQueries(['me']);
                queryClient.invalidateQueries(['leaderboard']);
                console.log('opponent disconnected');
                setGameOver(true);
                setTimeout(() => {
                    setWinner(me.username);
                }, 5000);
                updateGame({
                    player1: me.username,
                    player2: data.opponent,
                    ranked: true,
                    player1_score: 11,
                    player2_score: 1,
                });
            });
            socket.on('finished', (data) => {
                queryClient.invalidateQueries(['me']);
                queryClient.invalidateQueries(['leaderboard']);
                console.log('finished');
                setGameOver(true);
                setTimeout(() => {
                    setWinner(data.winner);
                }, 5000);
                updateGame({
                    player1: data.player1,
                    player2: data.player2,
                    ranked: true,
                    player1_score: data.player1_score,
                    player2_score: data.player2_score,
                });
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
            redirect('/game/standing');
        }
    }, [winner]);

    if (!ready) return <Loading />;
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <Sketch
                    className={'rounded-3xl overflow-hidden'}
                    setup={(p5: p5Types, canvasParentRef: Element) => {
                        setup(p5, canvasParentRef, init.width, init.height);
                    }}
                    draw={(p5: p5Types) => {
                        socket && draw(p5, me.username, socket);
                    }}
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
        </>
    );
}
