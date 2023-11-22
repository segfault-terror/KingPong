import p5Types from 'p5';
import { Vector } from 'matter-js';

export class Paddle {
    w: number;
    h: number;
    paddleimage: p5Types.Image;

    constructor(
        w: number,
        h: number,
        paddleimage: p5Types.Image,
    ) {
        this.w = w;
        this.h = h;
        this.paddleimage = paddleimage;
    }

    show(
        p5: p5Types,
        serverClientRatio: { width: number; height: number },
        topPaddle: boolean,
        pos?: Vector,
    ) {
        if (!pos) return;

        p5.push();
        p5.translate(
            pos.x * serverClientRatio.width,
            pos.y * serverClientRatio.height,
        );
        p5.image(
            this.paddleimage,
            -(this.w / 2),
            topPaddle === true ? -2 : -(this.h / 2),
            this.w,
            this.h,
        );
        p5.pop();
    }
}
