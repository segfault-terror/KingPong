import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Body, Engine } from 'matter-js';
import { PongTable } from '../utils/PongTable';
import { Ball } from '../utils/Ball';
import { Paddle } from '../utils/Paddle';
import { UserService } from 'src/user/user.service';

enum Direction {
    LEFT = 'left',
    RIGHT = 'right',
    NONE = 'none',
}

@Injectable()
export class ComputerService {
    constructor(private readonly userService: UserService) {}

    startGame(client: Socket) {
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
        });
        Body.applyForce(
            ball.body,
            { x: ball.body.position.x, y: ball.body.position.y },
            { x: 0, y: 0.0025 },
        );

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
        const frameRate = 1000 / 30;

        const interval = setInterval(() => {
            Engine.update(engine, frameRate);
            const ballPos = ball.body.position;
            const topPaddlePos = topPaddle.body.position;
            const bottomPaddlePos = bottomPaddle.body.position;
            client.emit('update-game', {
                ballPos,
                topPaddlePos,
                bottomPaddlePos,
            });
        }, frameRate);

        client.on('disconnect', () => {
            clearInterval(interval);
        });

        let moveInterval: NodeJS.Timeout;
        let currentDirection: Direction = Direction.NONE;

        const startMoving = (direction: Direction) => {
            moveInterval = setInterval(() => {
                if (direction === Direction.LEFT) {
                    if (bottomPaddle.body.position.x < 50) {
                        return;
                    }
                    Body.setPosition(bottomPaddle.body, {
                        x: bottomPaddle.body.position.x - 5,
                        y: bottomPaddle.body.position.y,
                    });
                } else if (direction === Direction.RIGHT) {
                    if (bottomPaddle.body.position.x > canvas.width - 50) {
                        return;
                    }
                    Body.setPosition(bottomPaddle.body, {
                        x: bottomPaddle.body.position.x + 5,
                        y: bottomPaddle.body.position.y,
                    });
                }
            }, frameRate);
        };

        const stopMoving = () => {
            clearInterval(moveInterval);
        };

        client.on('press-left', () => {
            currentDirection = Direction.LEFT;
            startMoving(currentDirection);
        });
        client.on('press-right', () => {
            currentDirection = Direction.RIGHT;
            startMoving(currentDirection);
        });
        client.on('release-left', () => {
            if (currentDirection === Direction.LEFT) {
                stopMoving();
                currentDirection = Direction.NONE;
            }
        });
        client.on('release-right', () => {
            if (currentDirection === Direction.RIGHT) {
                stopMoving();
                currentDirection = Direction.NONE;
            }
        });
    }
}
