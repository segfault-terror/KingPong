import p5Types from 'p5';
import { Engine, World, Runner, Bodies, Body, Events } from 'matter-js';
import { Box } from './Box';
import { PongTable } from './PongTable';
import { Ball } from './Ball';

let engine: Engine;
export let world: World;
let balls: Ball[] = [];
let pongTable: PongTable;
let topPaddle: Box;
let bottomPaddle: Box;
let ball: Ball;

export function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(500, 800).parent(canvasParentRef);
    engine = Engine.create();
    engine.gravity.y = 0;
    world = engine.world;
    Runner.run(engine);
    pongTable = new PongTable(p5.width, p5.height);
    topPaddle = new Box(p5.width / 2, 50, 100, 20, { isStatic: true });
    bottomPaddle = new Box(p5.width / 2, p5.height - 50, 100, 20, { isStatic: true });
    ball = new Ball(p5.width / 2, p5.height / 2, 10, { friction: 0, frictionAir: 0, frictionStatic: 0, restitution: 1 });
    Body.applyForce(ball.body, { x: ball.body.position.x, y: ball.body.position.y }, { x: 0, y: 0.0025 });

    Events.on(engine, 'collisionStart', (event) => {
        const pairs = event.pairs;
        //console.log(pairs);
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];
            if (pair.bodyA === ball.body) {
                //console.log('The ball has hit something!');
                Body.applyForce(ball.body, { x: ball.body.position.x, y: ball.body.position.y }, { x: 0, y: 0.025 });
            }
        }
    });
}

export function draw(p5: p5Types) {
    p5.background(51);
    for (let i = 0; i < balls.length; i++) {
        balls[i].show(p5);
        if (balls[i].isOffScreen(p5)) {
            balls[i].resetPosition(p5);
        }
    }
    ball.show(p5);
    if (ball.isOffScreen(p5)) {
        ball.resetPosition(p5);
    }
    topPaddle.show(p5);
    bottomPaddle.show(p5);
    move(p5);
    // pongTable.show(p5);
}

export function mousePressed(p5: p5Types) {
    // balls.push(new Ball(p5.mouseX, p5.mouseY, 10, { friction: 0, frictionAir: 0, frictionStatic: 0, restitution: 1 }));
    // balls[balls.length - 1].body.force.x = p5.random(-0.05, 0.05);
    // balls[balls.length - 1].body.force.y = p5.random(-0.05, 0.05);
}

export function move(p5: p5Types) {
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;

    if (p5.keyIsDown(LEFT_ARROW)) {
        if (bottomPaddle.body.position.x < 50) {
            return;
        }
        Body.setPosition(bottomPaddle.body, { x: bottomPaddle.body.position.x - 5, y: bottomPaddle.body.position.y });
    } else if (p5.keyIsDown(RIGHT_ARROW)) {
        if (bottomPaddle.body.position.x > p5.width - 50) {
            return;
        }
        Body.setPosition(bottomPaddle.body, { x: bottomPaddle.body.position.x + 5, y: bottomPaddle.body.position.y });
    }
}
