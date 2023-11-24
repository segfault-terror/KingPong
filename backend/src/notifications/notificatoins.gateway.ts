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

@WebSocketGateway({ namespace: 'notifications' })
@UseGuards(WsAuthGuard)
export class NotificationsGateway
    implements OnGatewayDisconnect, OnGatewayConnection
{
    connectedUsers: { username: string; sockets: string[] }[] = [];
    counter = 0;
    @WebSocketServer() server: Namespace;

    async handleConnection(socket: any) {
        const username = socket.request.user.username;
        const user = this.connectedUsers.find(
            (user) => user.username === username,
        );
        if (!user) {
            this.connectedUsers.push({ username, sockets: [socket.id] });
        } else {
            user.sockets.push(socket.id);
        }
        user.sockets.push(socket.id);
    }

    async handleDisconnect(socket: Socket) {
        const user = this.connectedUsers.find((user) =>
            user.sockets.includes(socket.id),
        );

        if (!user) return;
        user.sockets = user.sockets.filter((id) => id !== socket.id);
    }

    @SubscribeMessage('notif')
    async handleNotif(
        @MessageBody()
        {
            username,
            type,
            avatar,
            sender,
        }: {
            sender: string;
            username: string;
            type: string;
            avatar: string;
        },
    ) {
        const result = this.connectedUsers.find(
            (user) => user.username === username,
        );
        if (result)
            result.sockets.forEach((id) => {
                this.server.to(id).emit('notif', { sender, type, avatar });
                this.counter++;
            });
    }
}
