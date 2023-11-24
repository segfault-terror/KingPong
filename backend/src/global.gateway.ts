import { UseGuards } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { WsAuthGuard } from 'src/auth/ws.auth.guard';

@WebSocketGateway({ namespace: 'Global' })
@UseGuards(WsAuthGuard)
export class GlobalGateway implements OnGatewayDisconnect, OnGatewayConnection {
    connectedUsers: { username: string; sockets: string[] }[] = [];
    @WebSocketServer() server: Namespace;

    async handleConnection(socket: any) {
        if (!socket.request.user) return;
        const username = socket.request.user.username;
        const user = this.connectedUsers.find(
            (user) => user.username === username,
        );
        if (!user) {
            this.connectedUsers.push({ username, sockets: [socket.id] });
        } else {
            user.sockets.push(socket.id);
        }
    }

    async handleDisconnect(socket: Socket) {
        const user = this.connectedUsers.find((user) =>
            user.sockets.includes(socket.id),
        );

        if (!user) return;
        user.sockets = user.sockets.filter((id) => id !== socket.id);
    }

    @SubscribeMessage('friends')
    async handleFriends(@MessageBody() username: string) {
        const result = this.connectedUsers.find(
            (user) => user.username === username,
        );

        if (!result) return;
        result.sockets.forEach((id) => {
            this.server.to(id).emit('friends', username);
        });
    }
    @SubscribeMessage('notifications')
    async handleNotification(@MessageBody() username: string) {
        const result = this.connectedUsers.find(
            (user) => user.username === username,
        );

        if (!result) return;
        result.sockets.forEach((id) => {
            this.server.to(id).emit('notifications', username);
        });
    }

    @SubscribeMessage('profile')
    async handleProfile(
        @MessageBody() { user1, user2 }: { user1: string; user2: string },
    ) {
        const result1 = this.connectedUsers.find(
            (user) => user.username === user1,
        );

        const result2 = this.connectedUsers.find(
            (user) => user.username === user2,
        );

        if (result1)
            result1.sockets.forEach((id) => {
                this.server.to(id).emit('profile', { user1, user2 });
            });
        if (result2)
            result2.sockets.forEach((id) => {
                this.server.to(id).emit('profile', { user2, user1 });
            });
    }

    @SubscribeMessage('notif')
    async handleNotif(
        @MessageBody()
        {
            sender,
            username,
            type,
            avatar,
            ChallengeId,
        }: {
            sender: string;
            username: string;
            type: string;
            avatar: string;
            ChallengeId: string;
        },
    ) {
        const result = this.connectedUsers.find(
            (user) => user.username === sender,
        );

        if (result)
            result.sockets.forEach((id) => {
                this.server.to(id).emit('notif', {
                    username,
                    type,
                    avatar,
                    ChallengeId: type === 'GAME' ? ChallengeId : null,
                });
            });
    }

    @SubscribeMessage('chat-notif')
    handleChatNotif(
        @MessageBody() { receiverUsername }: { receiverUsername: string },
        @ConnectedSocket() socket: Socket,
    ) {
        const receiver = this.connectedUsers.find(
            (user) => user.username === receiverUsername,
        );

        if (!receiver) return;

        receiver.sockets.forEach((socketId) => {
            this.server.to(socketId).emit('chat-notif', {
                sender: (socket as any).request.user.username,
            });
        });
    }
}
