import { Vector } from 'matter-js';
import p5Types from 'p5';


export class Paddle {
    w: number;
    h: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.w = w;
        this.h = h;
    }

    show(
        p5: p5Types,
        serverClientRatio: { width: number; height: number },
        pos?: Vector,
    ) {
        if (!pos) return;

        p5.push();
        p5.translate(
            pos.x * serverClientRatio.width,
            pos.y * serverClientRatio.height,
        );
        p5.strokeWeight(1);
        p5.stroke(255);
        p5.fill(127);
        p5.rectMode(p5.CENTER);
        p5.rect(0, 0, this.w, this.h);
        p5.pop();
    }
}
