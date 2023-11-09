import {
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ComputerService } from './computer/computer.service';
import { GameService } from './game.service';

@WebSocketGateway({
    namespace: 'game',
})
export class GameGateway implements OnGatewayConnection {
    constructor(private readonly computerService: ComputerService, private readonly gameService: GameService) {}
    connectedUsers: { id: string; sockets: string }[] = [];
    queue: { league: string; socket: string }[] = [];

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: any): string {
        client.emit('message', 'Hello world!');
        console.log('payload', payload);
        return 'Hello world!';
    }

    handleConnection(client: Socket) {
        const user = this.connectedUsers.find((user) => user.id === client.id);

        if (!user)
            this.connectedUsers.push({
                id: client.id,
                sockets: client.id,
            });
        else client.disconnect(true);

        console.log('client', client.id);
        this.computerService.startGame(client);
    }

    @SubscribeMessage('matchmaking')
    handleGame(@MessageBody() data: any) {
        console.log('matchmaking', data);
        // const user = this.connectedUsers.find((user) => user.id === data.id);
        // if (!user) return;
        // console.log('matchmaking', data);
        // const league = data.stats.league;
        // //find user socket
        // this.queue.push({ league, socket: user.sockets });

        // // Filter the queue based on the length of the league
        // const filteredQueue = this.queue.filter((player) => player.league === league);

        // if (filteredQueue.length >= 2) {
        //     const player1 = filteredQueue.shift();
        //     const player2 = filteredQueue.shift();
        //     this.gameService.startGame(player1, player2);
        // }
    }
}
