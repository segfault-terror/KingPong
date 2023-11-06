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

@WebSocketGateway({ namespace: 'Global' })
@UseGuards(WsAuthGuard)
export class GlobalGateway implements OnGatewayDisconnect {
    connectedUsers: { username: string; sockets: string[] }[] = [];
    counter = 0;
    @WebSocketServer() server: Namespace;

    @SubscribeMessage('register')
    handleRegister(
        @MessageBody() username: string,
        @ConnectedSocket() socket: Socket,
    ) {
        console.log(`Register... ${username}`);
        const user = this.connectedUsers.find(
            (user) => user.username === username,
        );
        if (!user) {
            console.log(`[Global] Registered ${username} for the first time`);
            this.connectedUsers.push({ username, sockets: [socket.id] });
        } else {
            console.log(`[Global] Registered ${username} in another tab`);
            user.sockets.push(socket.id);
        }
    }

    async handleDisconnect(socket: Socket) {
        const user = this.connectedUsers.find((user) =>
            user.sockets.includes(socket.id),
        );

        if (!user) return;
        user.sockets = user.sockets.filter((id) => id !== socket.id);

        if (user.sockets.length === 0) {
            console.log(`[Global] Unregistered ${user.username} from all tabs`);
        } else {
            console.log(`[Global] Unregistered ${user.username} from one tab`);
        }
    }

    @SubscribeMessage('friends')
    async handleFriends(@MessageBody() username: string) {
        const result = this.connectedUsers.find(
            (user) => user.username === username,
        );

        console.log(result);
        if (!result) return;
        result.sockets.forEach((id) => {
            this.server.to(id).emit('friends', username);
            console.log(`#${this.counter} - friends to ${username}`);
            this.counter++;
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
            console.log(`---${this.counter} - Notification to ${username}`);
            this.counter++;
        });
    }

    @SubscribeMessage('profile')
    async handleProfile(
        @MessageBody() { user1, user2 }: { user1: string; user2: string },
    ) {
        console.log(`Profile to ${user1} and ${user2}`);
        const result1 = this.connectedUsers.find(
            (user) => user.username === user1,
        );

        const result2 = this.connectedUsers.find(
            (user) => user.username === user2,
        );

        if (result1)
            result1.sockets.forEach((id) => {
                this.server.to(id).emit('profile', { user1, user2 });
                console.log(
                    `+++${this.counter} - Profile to ${user1} and ${user2}`,
                );
                this.counter++;
            });
        if (result2)
            result2.sockets.forEach((id) => {
                this.server.to(id).emit('profile', { user1, user2 });
                console.log(
                    `+++${this.counter} - Profile to ${user1} and ${user2}`,
                );
                this.counter++;
            });
    }
}
