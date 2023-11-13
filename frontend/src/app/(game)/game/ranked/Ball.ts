import p5Types from 'p5';
import { Bodies, World, Body, Vector } from 'matter-js';
import { world } from './p5Matter';


export class Ball {
    r: number;

    constructor(x: number, y: number, r: number) {
        this.r = r;
    }

    show(p5: p5Types, pos?: Vector) {
        if (!pos) return;

        p5.push();
        p5.translate(pos.x, pos.y);
        p5.strokeWeight(1);
        p5.stroke(255);
        p5.fill(127);
        p5.ellipseMode(p5.CENTER);
        p5.circle(0, 0, this.r * 2);
        p5.pop();
    }
}