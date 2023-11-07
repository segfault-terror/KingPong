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
        });
        this.rightWall = Bodies.rectangle(width + 20, height / 2, 50, height, {
            isStatic: true,
        });
        this.topWall = Bodies.rectangle(width / 2, 0 - 20, width, 50, {
            isStatic: true,
            isSensor: true,
        });
        this.bottomWall = Bodies.rectangle(width / 2, height + 20, width, 50, {
            isStatic: true,
            isSensor: true,
        });
        World.add(world, [
            this.leftWall,
            this.rightWall,
            this.topWall,
            this.bottomWall,
        ]);
    }
}
