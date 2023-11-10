import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Namespace } from 'socket.io';
import { ComputerService } from './computer/computer.service';
import { GameService } from './game.service';
import { ConsoleLogger } from '@nestjs/common';

@WebSocketGateway({
    namespace: 'game',
})
export class GameGateway implements OnGatewayConnection {
    constructor(
        private readonly computerService: ComputerService,
        private readonly gameService: GameService,
    ) {}
    @WebSocketServer() server: Namespace;
    connectedUsers: { id: string; username: string; sockets: string }[] = [];
    queue: { username: string; league: string; socket: string }[] = [];

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: any): string {
        client.emit('message', 'Hello world!');
        console.log('payload', payload);
        return 'Hello world!';
    }

    handleConnection(client: Socket) {
        const user = this.connectedUsers.find((user) => user.id === client.id);

        if (!user) {
            console.log('new client', client.id);
            this.connectedUsers.push({
                id: client.id,
                sockets: client.id,
                username: '',
            });
        }
        // else client.disconnect(true);

        console.log('client', client.id);
        this.computerService.startGame(client);
    }

    async handleDisconnect(socket: Socket) {
        const user = this.connectedUsers.find((user) =>
            user.sockets.includes(socket.id),
        );

        if (!user) return;
        console.log(`[Global] Unregistered ${user.username} from one tab`);
    }

    @SubscribeMessage('register')
    async handleRegister(
        @MessageBody() username: string,
        @ConnectedSocket() socket: Socket,
    ) {
        console.log(`Register... ${username}`);
        const user = this.connectedUsers.find(
            (user) => user.username === username,
        );
        if (!user) {
            console.log(`[Global] Registered ${username} for the first time`);
            this.connectedUsers.push({
                username,
                sockets: socket.id,
                id: socket.id,
            });
        } else {
            // disallow multiple connections
            if (user.sockets !== socket.id) {
                console.log(`[Global] ${username} already has a connection`);
                socket.disconnect(true);
            }
        }
    }

    @SubscribeMessage('matchmaking')
    async handleGame(@MessageBody() data: any) {
        const user = this.connectedUsers.find(
            (user) => user.username === data.username,
        );
        if (!user) return;
        const UserQueue = this.queue.find(
            (queue) => queue.username === data.username,
        );
        if (!UserQueue) {
            this.queue.push({
                username: data.username,
                league: data.league,
                socket: user.sockets,
            });
            //filter queue by league if possible to match 2 players in the seem league
            const queue = this.queue.filter(
                (queue) => queue.league === data.league,
            );
            if (queue.length >= 2) {
                console.log('matchmaking', '2 players found');
                this.server.to(queue[0].socket).emit('matchmakingfound', true);
                this.server.to(queue[1].socket).emit('matchmakingfound', true);
                // const player1 = queue[0];
                // const player2 = queue[1];
                // this.gameService.createGame(
                //     player1.username,
                //     player2.username,
                //     player1.socket,
                //     player2.socket,
                // );
                // this.queue = this.queue.filter(
                //     (queue) =>
                //         queue.username !== player1.username &&
                //         queue.username !== player2.username,
                // );
            }
            // console.log('matchmaking', data);    
        }
    }
}
