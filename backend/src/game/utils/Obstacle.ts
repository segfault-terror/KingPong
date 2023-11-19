import { Bodies, World, Body } from 'matter-js';

export class Obstacle {
    body: Body;
    r: number;

    constructor(x: number, y: number, r: number, world: World) {
        this.body = Bodies.circle(x, y, r, {
            isStatic: true,
            restitution: 1,
            friction: 0,
            frictionAir: 0,
            frictionStatic: 0,
            inertia: Infinity,
            angle: 0,
            angularSpeed: 0,
            angularVelocity: 0,
            velocity: { x: 0, y: 0 },
        });
        this.r = r;
        World.add(world, this.body);
    }
}
