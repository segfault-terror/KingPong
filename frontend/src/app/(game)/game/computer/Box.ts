import p5Types from 'p5';
import { Bodies, World, Body } from 'matter-js';
import { world } from './p5Matter';


export class Box {
    body: Body;
    w: number;
    h: number;

    constructor(x: number, y: number, w: number, h: number, options?: Matter.IChamferableBodyDefinition) {
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        World.add(world, this.body);
    }

    show(p5: p5Types) {
        const pos = this.body.position;
        const angle = this.body.angle;

        p5.push();
        p5.translate(pos.x, pos.y);
        p5.rotate(angle);
        p5.strokeWeight(1);
        p5.stroke(255);
        p5.fill(127);
        p5.rectMode(p5.CENTER);
        p5.rect(0, 0, this.w, this.h);
        p5.pop();
    }
}