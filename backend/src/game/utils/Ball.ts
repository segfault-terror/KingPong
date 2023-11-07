import { Bodies, World, Body } from 'matter-js';
import { PongTable } from './PongTable';

export class Ball {
    body: Body;
    r: number;

    constructor(
        x: number,
        y: number,
        r: number,
        world: World,
        options?: Matter.IChamferableBodyDefinition,
    ) {
        this.body = Bodies.circle(x, y, r, options);
        this.r = r;
        World.add(world, this.body);
    }

    isOffScreen(table: PongTable) {
        const pos = this.body.position;
        return pos.y > table.height + 100 || pos.y < -100;
    }

    resetPosition(table: PongTable) {
        Body.setPosition(this.body, {
            x: table.width / 2,
            y: table.height / 2,
        });
    }
}
