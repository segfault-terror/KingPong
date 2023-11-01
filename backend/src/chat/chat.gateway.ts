import { UseGuards } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { WsAuthGuard } from 'src/auth/ws.auth.guard';

type IsTypingData = {
    username: string;
    isTyping: boolean;
};

@WebSocketGateway({ namespace: 'chat' })
@UseGuards(WsAuthGuard)
export class ChatGateway implements OnGatewayDisconnect {
    connectedUsers = [];
    counter = 0;
    @WebSocketServer() server: Namespace;

    @SubscribeMessage('register')
    handleRegister(
        @MessageBody() username: string,
        @ConnectedSocket() socket: Socket,
    ) {
        if (this.connectedUsers.find((user) => user.username === username))
            return;
        this.connectedUsers.push({ username, socketId: socket.id });
        console.log(`Registered ${username}`);
    }
    async handleDisconnect(socket: Socket) {
        const user = this.connectedUsers.find(
            (user) => user.socketId === socket.id,
        );
        this.connectedUsers = this.connectedUsers.filter(
            (user) => user.socketId !== socket.id,
        );
        console.log(`Unregistered ${user.username}`);
    }

    @SubscribeMessage('typing')
    handleTyping(@MessageBody() data: IsTypingData) {
        const result = this.connectedUsers.find(
            (user) => user.username === data.username,
        );

        if (!result) return;
        this.server.to(result.socketId).emit('typing', data);
        console.log(`#${this.counter} - Typing to ${data.username}`);
        ++this.counter;
    }
}
