import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGard } from 'src/auth/auth.guard';
import { ChatService } from './chat.service';

@Controller('chat')
@UseGuards(AuthGard)
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get('dm/:username')
    async getConversation(
        @Req() request: any,
        @Param('username') username: string,
    ) {
        return await this.chatService.getConversation(
            request.user.username,
            username,
        );
    }

    @Get('dms')
    async getAllDMs(@Req() request: any) {
        return await this.chatService.getBriefDMs(request.user.username);
    }
}
