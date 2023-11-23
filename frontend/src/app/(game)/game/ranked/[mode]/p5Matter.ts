import p5Types from 'p5';
import { Paddle } from '../../types/Paddle';
import { Ball } from '../../types/Ball';
import { Socket } from 'socket.io-client';
import { Score } from '../../types/Score';
import { Data, InitData } from './game';
import { Obstacle } from '../../types/Obstacle';

let pos: Data;

export function setPos(data: Data) {
    pos = data;
}

let topPaddle: Paddle;
let bottomPaddle: Paddle;
let ball: Ball;
let score: Score;
const obstacles: Obstacle[] = [];

let img: any;
function preload(p5: p5Types) {
    img = p5.loadImage('/images/bordgame.svg');
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

export function setup(
    p5: p5Types,
    canvasParentRef: Element,
    init: InitData,
    serverClientRatio: { width: number; height: number },
) {
    p5.createCanvas(init.width, init.height).parent(canvasParentRef);
    p5.frameRate(60);
    topPaddle = new Paddle(
        init.topPaddle.width * serverClientRatio.width,
        init.topPaddle.height * serverClientRatio.height,
        p5.loadImage('/images/paddleTop.svg'),
    );
    bottomPaddle = new Paddle(
        init.bottomPaddle.width * serverClientRatio.width,
        init.bottomPaddle.height * serverClientRatio.height,
        p5.loadImage('/images/paddleBottom.svg'),
    );
    ball = new Ball(init.ball.radius * serverClientRatio.width);
    score = new Score(0, 0);
    for (const obstacle of init.obstacles) {
        obstacles.push(
            new Obstacle(
                obstacle.width * serverClientRatio.width,
                obstacle.height * serverClientRatio.height,
            ),
        );
    }
    preload(p5);
}
let isMousePressed = false;

export function draw(
    p5: p5Types,
    serverClientRatio: { width: number; height: number },
    player: string,
    socket?: Socket,
) {
    if (!socket) return;
    p5.image(
        img,
        0,
        0,
        p5.width,
        p5.height,
        0,
        0,
        img.width,
        img.height,
        p5.COVER,
    );
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
    topPaddle.show(p5, serverClientRatio, true, pos?.topPaddlePos);
    bottomPaddle.show(p5, serverClientRatio, false, pos?.bottomPaddlePos);
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].show(p5, serverClientRatio, pos.obstaclesPos[i]);
    }
    if (isMousePressed) {
        const mx = p5.mouseX;
        const p = pos.bottomPaddlePos;
        if (mx < p.x * serverClientRatio.width - bottomPaddle.w / 2) {
            socket.emit('move-left');
        }
        if (mx > p.x * serverClientRatio.width + bottomPaddle.w / 2) {
            socket.emit('move-right');
        }
    }
    move(p5, socket, player);
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

export function mousePressed(p5: p5Types) {
    isMousePressed = true;
}

export function mouseReleased(p5: p5Types) {
    isMousePressed = false;
}
