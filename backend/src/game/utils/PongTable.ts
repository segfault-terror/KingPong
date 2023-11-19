import { Bodies, World, Body } from 'matter-js';

export class PongTable {
    leftWall: Body;
    rightWall: Body;
    topWall: Body;
    bottomWall: Body;
    width: number;
    height: number;

    constructor(width: number, height: number, world: World) {
        this.width = width;
        this.height = height;
        this.leftWall = Bodies.rectangle(0 - 20, height / 2, 50, height, {
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
        this.rightWall = Bodies.rectangle(width + 20, height / 2, 50, height, {
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
        this.topWall = Bodies.rectangle(width / 2, 0 - 20, width, 50, {
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
        this.bottomWall = Bodies.rectangle(width / 2, height + 20, width, 50, {
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
        World.add(world, [
            this.leftWall,
            this.rightWall,
            this.topWall,
            this.bottomWall,
        ]);
    }
}
