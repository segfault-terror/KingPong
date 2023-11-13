import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Body, Engine } from 'matter-js';
import { PongTable } from '../utils/PongTable';
import { Ball } from '../utils/Ball';
import { Paddle } from '../utils/Paddle';
import { UserService } from 'src/user/user.service';
import { emit } from 'process';

enum Direction {
    LEFT = 'left',
    RIGHT = 'right',
    NONE = 'none',
}

@Injectable()
export class RankedService {
    constructor(private readonly userService: UserService) {}

    async sendToClients(
        client1: Socket,
        client2: Socket,
        data1: any,
        data2: any,
        emitedEvent: string,
    ) {
        if (emitedEvent === 'canvas') console.log('send canvas');
        client1.emit(emitedEvent, data1);
        client2.emit(emitedEvent, data2);
    }

    startGame(client1: Socket, client2: Socket, player1: any, player2: any) {
        console.log('start game');
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
        setTimeout(() => {
            Body.applyForce(
                ball.body,
                { x: ball.body.position.x, y: ball.body.position.y },
                { x: 0, y: 0.0155 },
            );
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
        this.sendToClients(
            client1,
            client2,
            {
                canvas,
                frameRate,
                topPaddle: { width: topPaddle.w, height: topPaddle.h },
                bottomPaddle: { width: bottomPaddle.w, height: bottomPaddle.h },
                ball: { radius: ball.r },
            },
            {
                canvas,
                frameRate,
                topPaddle: { width: topPaddle.w, height: topPaddle.h },
                bottomPaddle: { width: bottomPaddle.w, height: bottomPaddle.h },
                ball: { radius: ball.r },
            },
            'canvas',
        );
        const interval = setInterval(() => {
            Engine.update(engine, frameRate);
            // if (ball.body.position.y < 0 || ball.body.position.y > canvas.height)
            //     ball.body.position.y = canvas.height / 2;
            const ballPos = ball.body.position;
            const topPaddlePos = topPaddle.body.position;
            const bottomPaddlePos = bottomPaddle.body.position;
            this.sendToClients(
                client1,
                client2,
                { ballPos, topPaddlePos, bottomPaddlePos },
                { ballPos, topPaddlePos, bottomPaddlePos },
                'update-game',
            );
        }, frameRate);

        client1.on('disconnect', () => {
            clearInterval(interval);
        });
        client2.on('disconnect', () => {
            clearInterval(interval);
        });
        
        client1.on('move-right', (player: string) => {
            console.log(player, ' 1 move right');
            if (player === player1.username) {
                if (bottomPaddle.body.position.x > canvas.width - 50) return;
                Body.setPosition(bottomPaddle.body, {
                    x: bottomPaddle.body.position.x + 5,
                    y: bottomPaddle.body.position.y,
                });
            }
        });
        
        client2.on('move-right', (player: string) => {
            console.log(player, ' 2 move right');
            if (player === player2.username) {
                if (topPaddle.body.position.x > canvas.width - 50) return;
                if (topPaddle.body.position.x > canvas.width - 50) return;
                Body.setPosition(topPaddle.body, {
                    x: topPaddle.body.position.x + 5,
                    y: topPaddle.body.position.y,
                });
            }
        });
        client1.on('move-left', (player: string) => {
            console.log(player, ' 1 move left');
            if (player === player1.username) {
                if (bottomPaddle.body.position.x < 50) return;
                Body.setPosition(bottomPaddle.body, {
                    x: bottomPaddle.body.position.x - 5,
                    y: bottomPaddle.body.position.y,
                });
            }
        });
        
        client2.on('move-left', (player: string) => {
            console.log(player, ' 2 move left');
            if (player === player2.username) {
                if (topPaddle.body.position.x < 50) return;
                Body.setPosition(topPaddle.body, {
                    x: topPaddle.body.position.x - 5,
                    y: topPaddle.body.position.y,
                });
            }
        });
    }
}
