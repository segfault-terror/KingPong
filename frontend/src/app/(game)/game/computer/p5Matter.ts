import p5Types from 'p5';
import { Engine, World, Runner, Bodies, Body, Events } from 'matter-js';
import { Paddle } from './Paddle';
import { Ball } from './Ball';
import { Socket } from 'socket.io-client';

import { InitData, pos } from './page';

let engine: Engine;
export let world: World;
let balls: Ball[] = [];
let topPaddle: Paddle;
let bottomPaddle: Paddle;
let ball: Ball;

export function setup(
    p5: p5Types,
    canvasParentRef: Element,
    init: InitData,
    serverClientRatio: { width: number; height: number },
) {
    p5.createCanvas(
        init.width,
        init.height,
    ).parent(canvasParentRef);
    p5.frameRate(60);
    topPaddle = new Paddle(
        p5.width / 2,
        p5.height * 0.05,
        init.topPaddle.width * serverClientRatio.width,
        init.topPaddle.height * serverClientRatio.height,
    );
    bottomPaddle = new Paddle(
        p5.width / 2,
        p5.height - p5.height * 0.05,
        init.bottomPaddle.width * serverClientRatio.width,
        init.bottomPaddle.height * serverClientRatio.height,
    );
    ball = new Ball(
        p5.width / 2,
        p5.height / 2,
        init.ball.radius * serverClientRatio.width,
    );

    // Events.on(engine, 'collisionStart', (event) => {
    //     const pairs = event.pairs;
    //     //console.log(pairs);
    //     for (let i = 0; i < pairs.length; i++) {
    //         const pair = pairs[i];
    //         if (pair.bodyA === ball.body) {
    //             //console.log('The ball has hit something!');
    //             Body.applyForce(
    //                 ball.body,
    //                 { x: ball.body.position.x, y: ball.body.position.y },
    //                 { x: 0, y: 0.025 },
    //             );
    //         }
    //     }
    // });
}

export function draw(
    p5: p5Types,
    serverClientRatio: { width: number; height: number },
    socket?: Socket,
) {
    if (!socket) return;
    p5.background(51);
    ball.show(p5, serverClientRatio, pos?.ballPos);
    topPaddle.show(p5, serverClientRatio, pos?.topPaddlePos);
    bottomPaddle.show(p5, serverClientRatio, pos?.bottomPaddlePos);
    move(p5, socket);
}

export function move(p5: p5Types, socket: Socket) {
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;

    if (p5.keyIsDown(LEFT_ARROW)) {
        socket.emit('move-left');
    } else if (p5.keyIsDown(RIGHT_ARROW)) {
        socket.emit('move-right');
    }
}
