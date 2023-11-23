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
            console.log(
                `[notifications] Registered ${username} for the first time`,
            );
            this.connectedUsers.push({ username, sockets: [socket.id] });
        } else {
            console.log(
                `[notifications] Registered ${username} in another tab`,
            );
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

        if (user.sockets.length === 0) {
            console.log(
                `[notifications] Unregistered ${user.username} from all tabs`,
            );
        } else {
            console.log(
                `[notifications] Unregistered ${user.username} from one tab`,
            );
        }
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
                console.log(`+++${this.counter} - Notif to ${username}`);
                this.counter++;
            });
    }
}
