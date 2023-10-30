import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGard } from 'src/auth/auth.guard';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create.message.dto';

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

    @Post('dm/message')
    async sendMessage(@Body() body: CreateMessageDto) {
        return await this.chatService.createMessage(
            body.content,
            body.sender,
            body.receiver,
        );
    }

    @Delete('dm/:id')
    async deleteMessage(@Param('id') id: string) {
        return await this.chatService.deleteDM(id);
    }
}
