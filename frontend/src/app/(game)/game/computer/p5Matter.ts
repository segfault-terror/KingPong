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

let img : any;
function preload(p5: p5Types) {
    img = p5.loadImage('/images/bordgame.svg');
}

function dashedLine(
    p5: p5Types,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    dashLength: number,
    serverClientRatio: { width: number; height: number },
) {
    const dashLen = dashLength === undefined ? 5 : dashLength,
        xpos = x2 - x1, //calculates delta between points
        ypos = y2 - y1,
        numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen); //num dashes to insert

    p5.noStroke(); // remove outline

    for (let i = 0; i < numDashes; i++) {
        p5.push();
        p5.translate((x1 += xpos / numDashes), (y1 += ypos / numDashes));
        p5.fill(96,46,101);
        p5.rectMode(p5.CENTER);
        p5.rect(
            0,
            0,
            20 * serverClientRatio.width,
            10 * serverClientRatio.height,
        );
        p5.pop();
    }
}

export function setup(
    p5: p5Types,
    canvasParentRef: Element,
    init: InitData,
    serverClientRatio: { width: number; height: number },
) {
    p5.createCanvas(init.width, init.height).parent(canvasParentRef);
    p5.frameRate(60);
    
    preload(p5);
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
}

export function draw(
    p5: p5Types,
    serverClientRatio: { width: number; height: number },
    socket?: Socket,
) {
    if (!socket) return;
    p5.background(50);
    p5.image(img, 0, 0,p5.width, p5.height, 0, 0, img.width, img.height, p5.COVER);
    dashedLine(
        p5,
        -20 * serverClientRatio.width,
        p5.height / 2,
        p5.width,
        p5.height / 2,
        40 * serverClientRatio.width,
        serverClientRatio,
    );
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
