'use client';
import React from 'react';
import dynamic from 'next/dynamic';

import { setup, draw, mousePressed, keyPressed } from './p5Matter';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

export default function Page() {
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
