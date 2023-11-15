import p5Types from 'p5';
import { Engine, World, Runner, Bodies, Body, Events } from 'matter-js';
import { Paddle } from './Paddle';
import { PongTable } from './PongTable';
import { Ball } from './Ball';
import { Socket } from 'socket.io-client';

import { pos } from './game';

let engine: Engine;
export let world: World;
let balls: Ball[] = [];
let pongTable: PongTable;
let topPaddle: Paddle;
let bottomPaddle: Paddle;
let ball: Ball;

export function setup(
    p5: p5Types,
    canvasParentRef: Element,
    width: number,
    height: number,
) {
    p5.createCanvas(width, height).parent(canvasParentRef);
    p5.frameRate(60);
    topPaddle = new Paddle(p5.width / 2, 50, 100, 20);
    bottomPaddle = new Paddle(p5.width / 2, p5.height - 50, 100, 20);

    engine = Engine.create();
    engine.gravity.y = 0;
    world = engine.world;
    Runner.run(engine);
    pongTable = new PongTable(p5.width, p5.height);
    ball = new Ball(p5.width / 2, p5.height / 2, 10);
}

export function draw(p5: p5Types, player: string, socket?: Socket) {
    if (!socket) return;
    p5.background(51);
    ball.show(p5, pos?.ballPos);
    topPaddle.show(p5, pos?.topPaddlePos);
    bottomPaddle.show(p5, pos?.bottomPaddlePos);
    move(p5, socket, player);
}

export function mousePressed(p5: p5Types) {
    // balls.push(new Ball(p5.mouseX, p5.mouseY, 10, { friction: 0, frictionAir: 0, frictionStatic: 0, restitution: 1 }));
    // balls[balls.length - 1].body.force.x = p5.random(-0.05, 0.05);
    // balls[balls.length - 1].body.force.y = p5.random(-0.05, 0.05);
}

export function move(p5: p5Types, socket: Socket, player: string) {
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;

    if (p5.keyIsDown(LEFT_ARROW)) {
        console.log(player, 'move left');
        socket.emit('move-left', player);
    } else if (p5.keyIsDown(RIGHT_ARROW)) {
        console.log(player, 'move right');
        socket.emit('move-right', player);
    }
}