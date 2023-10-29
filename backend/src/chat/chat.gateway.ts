import { UseGuards } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { WsAuthGuard } from 'src/auth/ws.auth.guard';

@WebSocketGateway({ namespace: 'chat' })
@UseGuards(WsAuthGuard)
export class ChatGateway {
    @WebSocketServer() server: Namespace;

    @SubscribeMessage('chat-test')
    handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        console.log(data);
        client.emit('chat-test', 'I received your data successfully');
    }
}
