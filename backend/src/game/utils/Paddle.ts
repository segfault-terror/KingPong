import { Bodies, World, Body } from 'matter-js';

export class Paddle {
    body: Body;
    w: number;
    h: number;

    constructor(
        x: number,
        y: number,
        w: number,
        h: number,
        world: World,
        options?: Matter.IChamferableBodyDefinition,
    ) {
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        World.add(world, this.body);
    }
}
