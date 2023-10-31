import p5Types from 'p5';
import { Bodies, World, Body } from 'matter-js';
import { world } from './p5Matter';

export class PongTable {
    leftWall: Body;
    rightWall: Body;
    topWall: Body;
    bottomWall: Body;

    constructor(width: number, height: number) {
        this.leftWall = Bodies.rectangle(0 - 20, height / 2, 50, height, { isStatic: true });
        this.rightWall = Bodies.rectangle(width + 20, height / 2, 50, height, { isStatic: true });
        this.topWall = Bodies.rectangle(width / 2, 0 - 20, width, 50, { isStatic: true, isSensor: true });
        this.bottomWall = Bodies.rectangle(width / 2, height + 20, width, 50, { isStatic: true, isSensor: true });
        World.add(world, [this.leftWall, this.rightWall, this.topWall, this.bottomWall]);
    }

    show(p5: p5Types) {
        p5.push();
        p5.strokeWeight(1);
        p5.noStroke();
        p5.fill(127);
        p5.rectMode(p5.CENTER);
        p5.rect(this.leftWall.position.x, this.leftWall.position.y, 50, p5.height);
        p5.rect(this.rightWall.position.x, this.rightWall.position.y, 50, p5.height);
        p5.rect(this.topWall.position.x, this.topWall.position.y, p5.width, 50);
        p5.rect(this.bottomWall.position.x, this.bottomWall.position.y, p5.width, 50);
        p5.pop();
    }
}
