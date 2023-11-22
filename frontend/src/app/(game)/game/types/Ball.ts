import p5Types from 'p5';
import { Vector } from 'matter-js';

export class Ball {
    r: number;

    constructor( r: number) {
        this.r = r;
    }

    show(
        p5: p5Types,
        clientServerRatio: { width: number; height: number },
        pos?: Vector,
    ) {
        if (!pos) return;

        p5.push();
        p5.translate(
            pos.x * clientServerRatio.width,
            pos.y * clientServerRatio.height,
        );
        p5.strokeWeight(1);
        p5.stroke(224,198,0);
        p5.fill(255,231,45);
        p5.ellipseMode(p5.CENTER);
        p5.circle(0, 0, this.r * 2);
        p5.pop();
    }
}
