'use client';
import React from 'react';
import dynamic from 'next/dynamic';

import { setup, draw, mousePressed } from './p5Matter';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

export default function Page() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
        </div>
    );
}
