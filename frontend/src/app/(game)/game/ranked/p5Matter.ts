import p5Types from 'p5';
import { Paddle } from './Paddle';
import { Ball } from './Ball';
import { Socket } from 'socket.io-client';

import { pos } from './game';

let topPaddle: Paddle;
let bottomPaddle: Paddle;
let ball: Ball;
let score: Score;

class Score {
    top: number;
    bottom: number;
    constructor(top: number, bottom: number) {
        this.top = top;
        this.bottom = bottom;
    }

    show(
        p5: p5Types,
        top: number,
        bottom: number,
        serverClientRatio: { width: number; height: number },
    ) {
        p5.push();
        p5.textSize(40 * serverClientRatio.width);
        p5.fill(80);
        p5.textStyle(p5.BOLD);
        p5.text(
            top,
            30 * serverClientRatio.width,
            p5.height / 2 - 30 * serverClientRatio.height,
        );
        p5.text(
            bottom,
            p5.width - 60 * serverClientRatio.width,
            p5.height / 2 + 70 * serverClientRatio.height,
        );
        p5.pop();
    }
}
//dashed line with rectangls herezontally
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
        p5.fill(80, 80, 80);
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

import { InitData } from './game';

export function setup(
    p5: p5Types,
    canvasParentRef: Element,
    init: InitData,
    serverClientRatio: { width: number; height: number },
) {
    p5.createCanvas(init.width, init.height).parent(canvasParentRef);
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
    score = new Score(0, 0);
}

export function draw(
    p5: p5Types,
    serverClientRatio: { width: number; height: number },
    player: string,
    socket?: Socket,
) {
    if (!socket) return;
    p5.background(51);
    dashedLine(
        p5,
        -10 * serverClientRatio.width,
        p5.height / 2,
        p5.width,
        p5.height / 2,
        40 * serverClientRatio.width,
        serverClientRatio,
    );
    score.show(p5, pos.score.top, pos.score.bottom, serverClientRatio);
    ball.show(p5, serverClientRatio, pos?.ballPos);
    topPaddle.show(p5, serverClientRatio, pos?.topPaddlePos);
    bottomPaddle.show(p5, serverClientRatio, pos?.bottomPaddlePos);
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
        socket.emit('move-left', player);
    } else if (p5.keyIsDown(RIGHT_ARROW)) {
        socket.emit('move-right', player);
    }
}
