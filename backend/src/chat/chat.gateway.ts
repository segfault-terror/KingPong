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
import { ChatService } from './chat.service';

type IsTypingData = {
    username: string;
    isTyping: boolean;
};

type ConnectedUser = {
    username: string;
    socketsId: string[];
};

type ChannelData = {
    channelName: string;
    connectedUsers: ConnectedUser[];
}[];

@WebSocketGateway({ namespace: 'chat' })
@UseGuards(WsAuthGuard)
export class ChatGateway implements OnGatewayDisconnect {
    connectedUsers: ConnectedUser[] = [];
    channels: ChannelData = [];
    counter = 0;
    @WebSocketServer() server: Namespace;
    constructor(private readonly chatService: ChatService) {}

    @SubscribeMessage('register')
    async handleRegister(
        @MessageBody() username: string,
        @ConnectedSocket() socket: Socket,
    ) {
        const user = this.connectedUsers.find(
            (user) => user.username === username,
        );
        if (user) {
            user.socketsId.push(socket.id);
            return;
        }
        this.connectedUsers.push({ username, socketsId: [socket.id] });

        const userChannels = await this.chatService.getUserChannels(username);

        userChannels.forEach((channel) => {
            socket.join(channel.name);
            console.log(`[channel] Joined ${channel.name}`);
        });
    }

    async handleDisconnect(socket: Socket) {
        const user = this.connectedUsers.find((user) =>
            user.socketsId.includes(socket.id),
        );

        if (!user) {
            return;
        }

        user.socketsId = user.socketsId.filter(
            (socketId: string) => socketId !== socket.id,
        );

        if (user.socketsId.length === 0) {
            this.connectedUsers = this.connectedUsers.filter(
                (user) => user.socketsId.length !== 0,
            );
        }

        const userChannels = await this.chatService.getUserChannels(
            user.username,
        );

        userChannels.forEach((channel) => {
            socket.leave(channel.name);
            console.log(`[channel] Left ${channel.name}`);
        });
    }

    @SubscribeMessage('typing')
    handleTyping(@MessageBody() data: IsTypingData) {
        const result = this.connectedUsers.find(
            (user) => user.username === data.username,
        );

        if (!result) return;

        result.socketsId.forEach((socketId: string) => {
            this.server.to(socketId).emit('typing', data);
        });

        ++this.counter;
    }

    @SubscribeMessage('new-message')
    handleNewMessage(@MessageBody() username: string) {
        const user = this.connectedUsers.find(
            (user) => user.username === username,
        );

        if (!user) {
            return;
        }

        user.socketsId.forEach((socketId: string) => {
            this.server.to(socketId).emit('new-message', username);
        });
    }

    @SubscribeMessage('new-channel-message')
    handleNewChannelMessage(@MessageBody() channelName: string) {
        console.log(`[channel] New message to channel ${channelName}`);

        this.server.to(channelName).emit('new-channel-message', channelName);
    }
}