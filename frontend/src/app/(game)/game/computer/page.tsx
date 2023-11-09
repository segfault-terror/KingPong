'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { setup, draw, mousePressed } from './p5Matter';
import { io } from 'socket.io-client';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

const delai = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function Page() {
    useEffect(() => {
        const socket = io(`/game`, {
            withCredentials: true,
            path: '/api/socket',
            autoConnect: false,
        });
        console.log(socket);
        socket.on('update-game', (data) => {
            console.log(data);
        });

        async function connect() {
            await delai(1500);
            socket.connect();
        }

        connect();

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.disconnect();
        };
    });
    return (
        <div className="flex justify-center items-center h-screen">
            <Sketch
                className={'border border-red-700 rounded-3xl overflow-hidden'}
                setup={setup}
                draw={draw}
                mousePressed={mousePressed}
            />
        </div>
    );
}
