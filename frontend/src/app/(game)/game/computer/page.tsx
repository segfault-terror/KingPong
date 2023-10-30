'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import p5Types from 'p5';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(600, 400, p5.WEBGL).parent(canvasParentRef);
}

function draw(p5: p5Types) {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
}

export default function Page() {
    return (
        <>
            <Sketch setup={setup} draw={draw} />
        </>
    );
}
