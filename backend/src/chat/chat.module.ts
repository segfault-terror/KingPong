import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
    controllers: [ChatController],
    providers: [ChatService, ChatGateway],
    imports: [],
    exports: [],
})
export class ChatModule {}
