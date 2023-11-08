import { UseGuards } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { PrismaService } from 'nestjs-prisma';
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
            console.log(`[chat] Registered ${username} in another tab`);
            return;
        }
        this.connectedUsers.push({ username, socketsId: [socket.id] });
        console.log(`[chat] Registered ${username} for the first time`);

        const userChannels = await this.chatService.getUserChannels(username);

        userChannels.forEach((channel) => {
            const channelData = this.channels.find(
                (channelData) => channelData.channelName === channel.name,
            );

            if (!channelData) {
                this.channels.push({
                    channelName: channel.name,
                    connectedUsers: [{ username, socketsId: [socket.id] }],
                });
                console.log(`[channel] Created channel ${channel.name}`);
                return;
            }
            channelData.connectedUsers.push({
                username,
                socketsId: [socket.id],
            });
            console.log(`[channel] Added ${username} to ${channel.name}`);
            console.dir(this.channels);
        });
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

        const userChannels = await this.chatService.getUserChannels(
            user.username,
        );

        userChannels.forEach((channel) => {
            const channelData = this.channels.find(
                (channelData) => channelData.channelName === channel.name,
            );

            if (!channelData) {
                console.log(
                    `[channel] Couldn't find channel ${channel.name} in channels`,
                );
                return;
            }

            channelData.connectedUsers = channelData.connectedUsers.filter(
                (connectedUser) => connectedUser.username !== user.username,
            );

            console.log(
                `[channel] Removed ${user.username} from ${channel.name}`,
            );

            if (channelData.connectedUsers.length === 0) {
                this.channels = this.channels.filter(
                    (channelData) =>
                        channelData.connectedUsers.length !== 0 &&
                        channelData.channelName !== channel.name,
                );
                console.log(`[channel] Deleted channel ${channel.name}`);
            }
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
