import p5Types from 'p5';
import { Vector } from 'matter-js';

export class Obstacle {
    w: number;
    h: number;

    constructor(w: number, h: number) {
        this.w = w;
        this.h = h;
    }

    show(p5: p5Types,
        serverClientRatio: { width: number; height: number },
        pos?: Vector) {
        if (!pos) return;
        
        p5.push();
        p5.translate(
            pos.x * serverClientRatio.width,
            pos.y * serverClientRatio.height,
        );
        p5.strokeWeight(1);
        p5.stroke(253, 187, 84);
        p5.fill(199, 79, 90);
        p5.ellipseMode(p5.CENTER);
        p5.ellipse(0, 0, this.w, this.h);
        p5.pop();
    }
}
