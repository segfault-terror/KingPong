import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import Matter, { Body, Collision, Engine } from 'matter-js';
import { PongTable } from '../utils/PongTable';
import { Ball } from '../utils/Ball';
import { Paddle } from '../utils/Paddle';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ComputerService {
    constructor(private readonly userService: UserService) {}

    startGame(client: Socket) {
        const playerSpeed = 5;
        const ballSpeed = 5;

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
        });
        const interval = setInterval(() => {
            Engine.update(engine, frameRate);
            const ballPos = ball.body.position;
            const topPaddlePos = topPaddle.body.position;
            const bottomPaddlePos = bottomPaddle.body.position;

            Body.setPosition(topPaddle.body, {
                x: ball.body.position.x,
                y: topPaddle.body.position.y,
            });

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
            if ((col = Collision.collides(ball.body, topPaddle.body))) {
                const xContact = col.supports[0].x;
                Body.setVelocity(ball.body, {
                    x: getXVelocity(xContact, topPaddle.body),
                    y: ballSpeed + 1,
                });
            }
            if ((col = Collision.collides(ball.body, bottomPaddle.body))) {
                const xContact = col.supports[0].x;

                Body.setVelocity(ball.body, {
                    x: getXVelocity(xContact, bottomPaddle.body),
                    y: -(ballSpeed + 1),
                });
            }
            if (Collision.collides(ball.body, table.leftWall)) {
                Body.setVelocity(ball.body, {
                    x: ballSpeed,
                    y: ball.body.velocity.y,
                });
            }
            if (Collision.collides(ball.body, table.rightWall)) {
                Body.setVelocity(ball.body, {
                    x: -ballSpeed,
                    y: ball.body.velocity.y,
                });
            }

            const resetBall = () => {
                Body.setVelocity(ball.body, { x: 0, y: 0 });
                Body.setPosition(ball.body, {
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                });
                setTimeout(() => {
                    Body.setVelocity(ball.body, { x: 0, y: ballSpeed });
                }, 1000);
            };

            if (Collision.collides(ball.body, table.topWall)) {
                resetBall();
            }
            if (Collision.collides(ball.body, table.bottomWall)) {
                resetBall();
            }

            client.emit('update-game', {
                ballPos,
                topPaddlePos,
                bottomPaddlePos,
            });
        }, frameRate);

        client.on('disconnect', () => {
            clearInterval(interval);
        });

        client.on('move-left', () => {
            if (bottomPaddle.body.position.x < 50) {
                return;
            }
            Body.setPosition(bottomPaddle.body, {
                x: bottomPaddle.body.position.x - playerSpeed,
                y: bottomPaddle.body.position.y,
            });
        });

        client.on('move-right', () => {
            if (bottomPaddle.body.position.x > canvas.width - 50) {
                return;
            }
            Body.setPosition(bottomPaddle.body, {
                x: bottomPaddle.body.position.x + playerSpeed,
                y: bottomPaddle.body.position.y,
            });
        });
    }
}
