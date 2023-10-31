import p5Types from 'p5';
import { Engine, World, Runner, Bodies } from 'matter-js';
import { Box } from './Box';
import { PongTable } from './PongTable';
import { Ball } from './Ball';

let engine: Engine;
export let world: World;
let balls: Ball[] = [];
let pongTable: PongTable;
let ground;

export function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(500, 800).parent(canvasParentRef);
    engine = Engine.create();
    engine.gravity.y = 0;
    world = engine.world;
    Runner.run(engine);
    pongTable = new PongTable(p5.width, p5.height);
}

export function draw(p5: p5Types) {
    p5.background(51);
    for (let i = 0; i < balls.length; i++) {
        balls[i].show(p5);
    }
    pongTable.show(p5);
}

export function mousePressed(p5: p5Types) {
    balls.push(new Ball(p5.mouseX, p5.mouseY, 10, { friction: 0, frictionAir: 0, frictionStatic: 0, restitution: 1 }));
    balls[balls.length - 1].body.force.x = p5.random(-0.05, 0.05);
    balls[balls.length - 1].body.force.y = p5.random(-0.05, 0.05);
}
