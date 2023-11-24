import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Body, Collision, Common, Engine } from 'matter-js';
import { PongTable } from '../utils/PongTable';
import { Ball } from '../utils/Ball';
import { Paddle } from '../utils/Paddle';
import { GameService } from '../game.service';
import { status } from '../game.enum';
import { timer } from 'rxjs';
import {
    AchievementsService,
    dataAchived,
} from 'src/achievements/achievements.service';

import { Obstacle } from '../utils/Obstacle';

type matchQueueProps = {
    player1: {
        username: string;
        socket: string;
        score1: number;
    };
    player2: {
        username: string;
        socket: string;
        score2: number;
    };
    status: status;
    dataAchieved: dataAchived;
};

type GameMode = 'normal' | 'obstacle' | 'reverse';

@Injectable()
export class RankedService {
    constructor(
        private readonly gameService: GameService,
        private readonly achievement: AchievementsService,
    ) {}

    async sendToClients(
        client1: Socket,
        client2: Socket,
        data1: any,
        data2: any,
        emitedEvent: string,
    ) {
        client1.emit(emitedEvent, data1);
        client2.emit(emitedEvent, data2);
    }

    async updataData(matchQueue: any, client1?: Socket, client2?: Socket) {
        this.sendToClients(
            client1,
            client2,
            {
                winner:
                    matchQueue.player1.score1 == 7
                        ? matchQueue.player1.username
                        : matchQueue.player2.username,
                player1: matchQueue.player1.username,
                player2: matchQueue.player2.username,
                player1_score: matchQueue.player1.score1,
                player2_score: matchQueue.player2.score2,
                iWin: matchQueue.player1.score1 == 7,
            },
            {
                winner:
                    matchQueue.player2.score2 == 7
                        ? matchQueue.player2.username
                        : matchQueue.player1.username,
                player2: matchQueue.player2.username,
                player1: matchQueue.player1.username,
                player2_score: matchQueue.player2.score2,
                player1_score: matchQueue.player1.score1,
                iWin: matchQueue.player2.score2 == 7,
            },
            'finished',
        );
        // add the match to the database
        this.gameService.AddMatch(
            matchQueue.player1.username,
            matchQueue.player2.username,
            true,
            matchQueue.player1.score1,
            matchQueue.player2.score2,
        );
        // update the database
        this.gameService.updatePlayerScore({
            player1: matchQueue.player1.username,
            player2: matchQueue.player2.username,
            ranked: true,
            player1_score: matchQueue.player1.score1,
            player2_score: matchQueue.player2.score2,
        });
        setTimeout(() => {
            this.achievement.GenerateAchievements(matchQueue.dataAchieved);
        }, 1000);
    }

    startGame(
        client1: Socket,
        client2: Socket,
        player1: any,
        player2: any,
        matchQueue: matchQueueProps,
        mode: GameMode,
    ) {
        const playerSpeed = 10;
        const initialBallSpeed = 5;
        let ballSpeed = initialBallSpeed;

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
        matchQueue.status = 'PLAYING';
        this.sendToClients(
            client1,
            client2,
            {
                canvas,
                frameRate,
                topPaddle: { width: topPaddle.w, height: topPaddle.h },
                bottomPaddle: { width: bottomPaddle.w, height: bottomPaddle.h },
                ball: { radius: ball.r },
                obstacles: obstacles.map((o) => ({
                    width: o.r * 2,
                    height: o.r * 2,
                })),
            },
            {
                canvas,
                frameRate,
                topPaddle: { width: topPaddle.w, height: topPaddle.h },
                bottomPaddle: { width: bottomPaddle.w, height: bottomPaddle.h },
                ball: { radius: ball.r },
                obstacles: obstacles.map((o) => ({
                    width: o.r * 2,
                    height: o.r * 2,
                })),
            },
            'canvas',
        );

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

        let counterSpeed = 0;
        let Timer = 0;
        let MaxTimeRound = 0;
        let Seconds = 0;
        const GameHook = () => {
            Engine.update(engine, frameRate);
            if (Timer % 60 === 0) {
                Seconds++;
            }
            if (Seconds > MaxTimeRound) {
                MaxTimeRound = Seconds;
            }
            Timer++;
            const ballPos = ball.body.position;
            const revsBallPos = {
                x: canvas.width - ballPos.x,
                y: canvas.height - ballPos.y,
            };
            const topPaddlePos = topPaddle.body.position;
            const revTopPaddlePos = {
                x: canvas.width - topPaddlePos.x,
                y: canvas.height - topPaddlePos.y,
            };
            const bottomPaddlePos = bottomPaddle.body.position;
            const revBottomPaddlePos = {
                x: canvas.width - bottomPaddlePos.x,
                y: canvas.height - bottomPaddlePos.y,
            };

            const obstaclesPos = obstacles.map((o) => ({
                x: o.body.position.x,
                y: o.body.position.y,
            }));

            const revObstaclesPos = obstaclesPos.map((o) => ({
                x: canvas.width - o.x,
                y: canvas.height - o.y,
            }));

            if (counterSpeed === 6 && ballSpeed < 16) {
                counterSpeed = 0;
                ballSpeed += 1;
            }

            if (matchQueue.status === 'CANCEL') {
                return clearInterval(interval);
            }
            if (
                matchQueue.player1.score1 == 7 ||
                matchQueue.player2.score2 == 7
            ) {
                matchQueue.status = 'END';
                this.updataData(matchQueue, client1, client2);

                return clearInterval(interval);
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
                counterSpeed++;
                matchQueue.dataAchieved.player2.TimeTouchPaddle++;
                Body.setVelocity(ball.body, {
                    x: getXVelocity(xContact, topPaddle.body),
                    y: ballSpeed + 1,
                });
            }
            if (
                (col = Collision.collides(ball.body, bottomPaddle.body, null))
            ) {
                const xContact = col.supports[0].x;
                counterSpeed++;
                matchQueue.dataAchieved.player1.TimeTouchPaddle++;
                Body.setVelocity(ball.body, {
                    x: getXVelocity(xContact, bottomPaddle.body),
                    y: -(ballSpeed + 1),
                });
            }

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
                matchQueue.player1.score1++;
                matchQueue.dataAchieved.player1.score++;
                matchQueue.dataAchieved.player1.MinTimeRound = Math.min(
                    matchQueue.dataAchieved.player1.MinTimeRound,
                    Seconds,
                );
                matchQueue.dataAchieved.player1.MaxTimeRound = Math.max(
                    matchQueue.dataAchieved.player1.MaxTimeRound,
                    Seconds,
                );

                Seconds = 0;
                resetBall();
            }
            if (Collision.collides(ball.body, table.bottomWall, null)) {
                matchQueue.player2.score2++;
                matchQueue.dataAchieved.player2.score++;
                matchQueue.dataAchieved.player2.MinTimeRound = Math.min(
                    matchQueue.dataAchieved.player2.MinTimeRound,
                    Seconds,
                );
                matchQueue.dataAchieved.player2.MaxTimeRound = Math.max(
                    matchQueue.dataAchieved.player2.MaxTimeRound,
                    Seconds,
                );

                Seconds = 0;
                resetBall();
            }

            if (checkBallOutOfBounds()) {
                resetBall();
            }

            this.sendToClients(
                client1,
                client2,
                {
                    ballPos,
                    topPaddlePos,
                    bottomPaddlePos,
                    username: player1.username,
                    obstaclesPos,
                    score: {
                        top: matchQueue.player2.score2,
                        bottom: matchQueue.player1.score1,
                    },
                },
                {
                    ballPos: revsBallPos,
                    topPaddlePos: revBottomPaddlePos,
                    bottomPaddlePos: revTopPaddlePos,
                    username: player2.username,
                    obstaclesPos: revObstaclesPos,
                    score: {
                        top: matchQueue.player1.score1,
                        bottom: matchQueue.player2.score2,
                    },
                },
                'update-game',
            );
        };
        const interval = setInterval(GameHook, frameRate);

        client1.on('disconnect', () => {
            matchQueue.status = 'CANCEL';
            clearInterval(interval);
        });
        client2.on('disconnect', () => {
            matchQueue.status = 'CANCEL';
            clearInterval(interval);
        });

        client1.on('move-right', (player: string) => {
            if (player === player1.username) {
                if (
                    bottomPaddle.body.position.x + playerSpeed >
                    canvas.width - 50
                )
                    return;
                Body.setPosition(bottomPaddle.body, {
                    x: bottomPaddle.body.position.x + playerSpeed,
                    y: bottomPaddle.body.position.y,
                });
            } else if (player === player2.username) {
                if (topPaddle.body.position.x - playerSpeed < 50) return;
                Body.setPosition(topPaddle.body, {
                    x: topPaddle.body.position.x - playerSpeed,
                    y: topPaddle.body.position.y,
                });
            }
        });

        client2.on('move-right', (player: string) => {
            if (player === player2.username) {
                if (topPaddle.body.position.x - playerSpeed < 50) return;
                Body.setPosition(topPaddle.body, {
                    x: topPaddle.body.position.x - playerSpeed,
                    y: topPaddle.body.position.y,
                });
            } else if (player === player1.username) {
                if (
                    bottomPaddle.body.position.x + playerSpeed >
                    canvas.width - 50
                )
                    return;
                Body.setPosition(bottomPaddle.body, {
                    x: bottomPaddle.body.position.x + playerSpeed,
                    y: bottomPaddle.body.position.y,
                });
            }
        });
        client1.on('move-left', (player: string) => {
            if (player === player1.username) {
                if (bottomPaddle.body.position.x - playerSpeed < 50) return;
                Body.setPosition(bottomPaddle.body, {
                    x: bottomPaddle.body.position.x - playerSpeed,
                    y: bottomPaddle.body.position.y,
                });
            } else if (player === player2.username) {
                if (topPaddle.body.position.x + playerSpeed > canvas.width - 50)
                    return;
                Body.setPosition(topPaddle.body, {
                    x: topPaddle.body.position.x + playerSpeed,
                    y: topPaddle.body.position.y,
                });
            }
        });

        client2.on('move-left', (player: string) => {
            if (player === player2.username) {
                if (topPaddle.body.position.x + playerSpeed > canvas.width - 50)
                    return;
                Body.setPosition(topPaddle.body, {
                    x: topPaddle.body.position.x + playerSpeed,
                    y: topPaddle.body.position.y,
                });
            } else if (player === player1.username) {
                if (bottomPaddle.body.position.x - playerSpeed < 50) return;
                Body.setPosition(bottomPaddle.body, {
                    x: bottomPaddle.body.position.x - playerSpeed,
                    y: bottomPaddle.body.position.y,
                });
            }
        });
    }
}
