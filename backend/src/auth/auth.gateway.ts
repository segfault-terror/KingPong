import { UseGuards } from '@nestjs/common';
import {
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { WsAuthGuard } from './ws.auth.guard';

@WebSocketGateway({ namespace: 'auth' })
export class AuthGateway implements OnGatewayConnection {
    @WebSocketServer() io: Namespace;

    @UseGuards(WsAuthGuard)
    @SubscribeMessage('test')
    async connect(client: any, ...args: any[]) {
        console.log('client connected', client.request.user);
        console.log('args', args);
        client.emit('test', 'connected');
        return { event: 'test', data: 'connected' };
    }

    async handleConnection(client: any, ...args: any[]) {
        if (client.request.user) {
            client.emit('acccept-connection', 'connected');
            return { event: 'acccept-connection', data: 'connected' };
        }
        client.disconnect();
    }
}
