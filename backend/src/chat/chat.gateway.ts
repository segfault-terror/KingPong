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

type ConnectedUser = {
    username: string;
    socketsId: string[];
};

@WebSocketGateway({ namespace: 'chat' })
@UseGuards(WsAuthGuard)
export class ChatGateway implements OnGatewayDisconnect {
    connectedUsers: ConnectedUser[] = [];
    counter = 0;
    @WebSocketServer() server: Namespace;

    @SubscribeMessage('register')
    handleRegister(
        @MessageBody() username: string,
        @ConnectedSocket() socket: Socket,
    ) {
        const user = this.connectedUsers.find(
            (user) => user.username === username,
        );
        if (user) {
            user.socketsId.push(socket.id);
            console.log(`[chat] Registered ${username} in another tab`);
            return;
        }
        this.connectedUsers.push({ username, socketsId: [socket.id] });
        console.log(`[chat] Registered ${username} for the first time`);
    }

    async handleDisconnect(socket: Socket) {
        const user = this.connectedUsers.find((user) =>
            user.socketsId.includes(socket.id),
        );

        if (!user) {
            console.log(
                `[chat] Couldn't find user with socket id ${socket.id}`,
            );
            return;
        }

        user.socketsId = user.socketsId.filter(
            (socketId: string) => socketId !== socket.id,
        );
        console.log(
            `[chat] Disconnected ${user.username} from ${socket.id} - user has ${user.socketsId.length} sockets left`,
        );

        if (user.socketsId.length === 0) {
            console.log(`[chat] Completely unregistered ${user.username}`);
            this.connectedUsers = this.connectedUsers.filter(
                (user) => user.socketsId.length !== 0,
            );
        }
    }

    @SubscribeMessage('typing')
    handleTyping(@MessageBody() data: IsTypingData) {
        const result = this.connectedUsers.find(
            (user) => user.username === data.username,
        );

        if (!result) return;

        result.socketsId.forEach((socketId: string) => {
            this.server.to(socketId).emit('typing', data);
            console.log(`[chat] #${this.counter} - Typing to ${data.username}`);
        });

        ++this.counter;
    }

    @SubscribeMessage('new-message')
    handleNewMessage(@MessageBody() username: string) {
        console.log(`[chat] New message to ${username}`);

        const user = this.connectedUsers.find(
            (user) => user.username === username,
        );

        if (!user) {
            console.log(
                `[chat] Couldn't find user ${username} in connectedUsers`,
            );
            return;
        }

        console.log(`[chat] Sending message to user ${username}`);
        user.socketsId.forEach((socketId: string) => {
            this.server.to(socketId).emit('new-message', username);
        });
    }
}
