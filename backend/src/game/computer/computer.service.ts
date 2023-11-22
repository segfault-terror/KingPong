import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import Matter, { Body, Collision, Common, Engine } from 'matter-js';
import { PongTable } from '../utils/PongTable';
import { Ball } from '../utils/Ball';
import { Paddle } from '../utils/Paddle';
import { UserService } from 'src/user/user.service';
import { Obstacle } from '../utils/Obstacle';

type GameMode = 'normal' | 'obstacle' | 'reverse';

@Injectable()
export class ComputerService {
    constructor(private readonly userService: UserService) {}

    startGame(client: Socket, mode: GameMode) {
        const playerSpeed = 10;
        const initialBallSpeed = 5;
        let ballSpeed = initialBallSpeed;

        client.emit('start-game', 'start-game');
        const canvas = { width: 500, height: 800 };
        const engine = Engine.create({ gravity: { x: 0, y: 0 } });
        const world = engine.world;
        const table = new PongTable(canvas.width, canvas.height, world);
        table;
        const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, world, {
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
        const obstacles: Obstacle[] = [];
        if (mode === 'obstacle') {
            let obstacle: Obstacle;

            let randomX = Common.random(0, 200);
            let randomY = Common.random(150, 300);
            let randomR = Common.random(10, 50);
            obstacle = new Obstacle(randomX, randomY, randomR, world);
            obstacles.push(obstacle);

            randomX = Common.random(300, 400);
            randomY = Common.random(150, 300);
            randomR = Common.random(10, 50);
            obstacle = new Obstacle(randomX, randomY, randomR, world);
            obstacles.push(obstacle);

            randomX = Common.random(0, 200);
            randomY = Common.random(500, 650);
            randomR = Common.random(10, 50);
            obstacle = new Obstacle(randomX, randomY, randomR, world);
            obstacles.push(obstacle);

            randomX = Common.random(300, 400);
            randomY = Common.random(500, 650);
            randomR = Common.random(10, 50);
            obstacle = new Obstacle(randomX, randomY, randomR, world);
            obstacles.push(obstacle);
        }
        setTimeout(() => {
            Body.setVelocity(ball.body, { x: 0, y: ballSpeed });
        }, 2000);

        const topPaddle = new Paddle(canvas.width / 2, 50, 100, 20, world, {
            isStatic: true,
        });
        const bottomPaddle = new Paddle(
            canvas.width / 2,
            canvas.height - 50,
            100,
            20,
            world,
            { isStatic: true },
        );
        const frameRate = 1000 / 60;

        client.emit('canvas', {
            canvas,
            frameRate,
            topPaddle: { width: topPaddle.w, height: topPaddle.h },
            bottomPaddle: { width: bottomPaddle.w, height: bottomPaddle.h },
            ball: { radius: ball.r },
            obstacles: obstacles.map((o) => ({
                x: o.body.position.x,
                y: o.body.position.y,
                width: o.r * 2,
                height: o.r * 2,
            })),
        });

        let counter = 0;
        let randomPos = Common.random(-50, 50);
        const orPair = (x: number, y: number) => {
            const random = Common.random(-10, 10);
            if (random < 0) {
                return x;
            }
            return y;
        };
        let randomStart = {
            x: Common.random(-ballSpeed, ballSpeed),
            y: orPair(-ballSpeed, ballSpeed),
        };
        let yourScore = 0;
        let opponentScore = 0;

        const gameLogic = () => {
            Engine.update(engine, frameRate);
            const ballPos = ball.body.position;
            const topPaddlePos = topPaddle.body.position;
            const bottomPaddlePos = bottomPaddle.body.position;

            const moveBot = () => {
                const bp = ball.body.position.x - canvas.width / 2;
                const tp =
                    topPaddle.body.position.x + randomPos - canvas.width / 2;
                const dx = Math.abs(bp - tp);
                if (ballPos.y > canvas.height / 2) return;
                if (ball.body.velocity.y < 0 && dx > 5) {
                    if (
                        ball.body.position.x <
                        topPaddle.body.position.x + randomPos
                    ) {
                        movePaddleLeft(topPaddle);
                    } else {
                        movePaddleRight(topPaddle);
                    }
                }
            };

            moveBot();

            const checkBallOutOfBounds = () => {
                if (ballPos.y > canvas.height) {
                    return true;
                }
                if (ballPos.y < 0) {
                    return true;
                }
                if (ballPos.x > canvas.width) {
                    return true;
                }
                if (ballPos.x < 0) {
                    return true;
                }
                return false;
            };

            if (counter === 3) {
                counter = 0;
                ballSpeed += 1;
            }

            const getXVelocity = (xContact: number, paddle: Matter.Body) => {
                const paddleContact = xContact - paddle.position.x;

                const xVelocity =
                    (paddleContact / (bottomPaddle.w / 2)) * ballSpeed;

                const ballXVelocity = ball.body.velocity.x;

                if (ballXVelocity * xVelocity >= 0) {
                    const tot = Math.abs(ballXVelocity) + Math.abs(xVelocity);
                    if (tot > ballSpeed) {
                        if (xVelocity < 0) {
                            return -ballSpeed;
                        }
                        return ballSpeed;
                    }
                    return xVelocity + ballXVelocity;
                }
                const tot = xVelocity - ballXVelocity;
                if (tot < -ballSpeed) {
                    return xVelocity;
                }
                return xVelocity - ballXVelocity;
            };
            let col: Collision;
            if ((col = Collision.collides(ball.body, topPaddle.body, null))) {
                const xContact = col.supports[0].x;
                randomPos = Common.random(-50, 50);
                Body.setVelocity(ball.body, {
                    x: getXVelocity(xContact, topPaddle.body),
                    y: ballSpeed + 1,
                });
            }
            if (
                (col = Collision.collides(ball.body, bottomPaddle.body, null))
            ) {
                const xContact = col.supports[0].x;
                counter++;
                Body.setVelocity(ball.body, {
                    x: getXVelocity(xContact, bottomPaddle.body),
                    y: -(ballSpeed + 1),
                });
            }

            const resetBall = () => {
                ballSpeed = initialBallSpeed;
                randomStart = {
                    x: Common.random(-ballSpeed, ballSpeed),
                    y: orPair(-ballSpeed, ballSpeed),
                };
                Body.setVelocity(ball.body, { x: 0, y: 0 });
                Body.setPosition(ball.body, {
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                });
                setTimeout(() => {
                    Body.setVelocity(ball.body, {
                        x: randomStart.x,
                        y: randomStart.y,
                    });
                }, 1000);
            };

            if (Collision.collides(ball.body, table.topWall, null)) {
                resetBall();
                yourScore++;
            }
            if (Collision.collides(ball.body, table.bottomWall, null)) {
                resetBall();
                opponentScore++;
            }

            if (checkBallOutOfBounds()) {
                client.emit('ball-out-of-bounds', 'ball-out-of-bounds');
                resetBall();
            }

            client.emit('update-game', {
                ballPos,
                topPaddlePos,
                bottomPaddlePos,
                obstaclesPos: obstacles.map((o) => o.body.position),
                yourScore,
                opponentScore,
            });
        };
        let interval = setInterval(gameLogic, frameRate);

        client.on('disconnect', () => {
            clearInterval(interval);
        });

        client.on('stop-game', () => {
            clearInterval(interval);
        });

        client.on('restart-game', () => {
            clearInterval(interval);
            this.startGame(client, mode);
        });

        client.on('pause-game', () => {
            clearInterval(interval);
        });

        client.on('resume-game', () => {
            clearInterval(interval);
            interval = setInterval(gameLogic, frameRate);
        });

        const movePaddleLeft = (paddle: Paddle) => {
            if (paddle.body.position.x - playerSpeed < paddle.w / 2) {
                return;
            }
            Body.setPosition(paddle.body, {
                x: paddle.body.position.x - playerSpeed,
                y: paddle.body.position.y,
            });
        };

        const movePaddleRight = (paddle: Paddle) => {
            if (
                paddle.body.position.x + playerSpeed >
                canvas.width - paddle.w / 2
            ) {
                return;
            }
            Body.setPosition(paddle.body, {
                x: paddle.body.position.x + playerSpeed,
                y: paddle.body.position.y,
            });
        };

        client.on('move-left', () => {
            movePaddleLeft(bottomPaddle);
        });

        client.on('move-right', () => {
            movePaddleRight(bottomPaddle);
        });
    }
}
