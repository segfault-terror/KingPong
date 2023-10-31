import p5Types from 'p5';
import { Bodies, World, Body } from 'matter-js';
import { world } from './p5Matter';


export class Ball {
    body: Body;
    r: number;

    constructor(x: number, y: number, r: number, options?: Matter.IChamferableBodyDefinition) {
        this.body = Bodies.circle(x, y, r, options);
        this.r = r;
        World.add(world, this.body);
    }

    isOffScreen(p5: p5Types) {
        const pos = this.body.position;
        return (pos.y > p5.height + 100 || pos.y < -100);
    }

    resetPosition(p5: p5Types) {
        const pos = this.body.position;
        Body.setPosition(this.body, { x: p5.width / 2, y: p5.height / 2 });
        Body.setSpeed(this.body, this.body.speed * 0.9);
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
        p5.ellipseMode(p5.CENTER);
        p5.circle(0, 0, this.r * 2);
        p5.pop();
    }
}