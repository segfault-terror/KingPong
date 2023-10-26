import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGard } from 'src/auth/auth.guard';

@Controller('chat')
@UseGuards(AuthGard)
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get('dm/:username1/:username2')
    async getConversation(
        @Param('username1') username1: string,
        @Param('username2') username2: string,
    ) {
        return await this.chatService.getConversation(username1, username2);
    }
}
