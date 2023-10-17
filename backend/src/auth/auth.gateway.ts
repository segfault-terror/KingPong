import { UseGuards } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { WsAuthGuard } from './ws.auth.guard';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({ namespace: 'auth' })
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() io: Namespace;

    constructor(private readonly userService: UserService) {}

    @UseGuards(WsAuthGuard)
    @SubscribeMessage('test')
    async connect(client: any, ...args: any[]) {
        console.log('client connected', client.request.user);
        console.log('args', args);
        client.emit('test', 'connected');
        return { event: 'test', data: 'connected' };
    }

    async handleConnection(client: any) {
        if (client.request.user) {
            const user = await this.userService.user({
                username: client.request.user.username,
            });

            user.status = 'ONLINE';

            await this.userService.updateUser({
                where: { username: user.username },
                data: user,
            });

            client.emit('acccept-connection', 'connected');
            return { event: 'acccept-connection', data: 'connected' };
        }
        client.disconnect();
    }

    async handleDisconnect(client: any) {
        const user = await this.userService.user({
            username: client.request.user.username,
        });

        user.status = 'OFFLINE';

        await this.userService.updateUser({
            where: { username: user.username },
            data: user,
        });
    }
}
