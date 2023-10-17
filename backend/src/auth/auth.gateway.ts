import {
    OnGatewayConnection,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';

@WebSocketGateway({ namespace: 'auth' })
export class AuthGateway implements OnGatewayConnection {
    @WebSocketServer() io: Namespace;

    async handleConnection() {
        console.log('connected');
    }
}
