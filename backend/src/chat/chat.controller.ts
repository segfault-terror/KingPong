import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGard } from 'src/auth/auth.guard';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create.message.dto';
import { PrismaService } from 'nestjs-prisma';

@Controller('chat')
@UseGuards(AuthGard)
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
        private readonly prismaService: PrismaService,
    ) {}

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
    async deleteMessage(@Param('id') id: string, @Req() request: any) {
        return await this.chatService.deleteDM(id, request.user.id);
    }

    @Get('channels/:username')
    async getUserChannels(@Param('username') username: string) {
        const user = await this.prismaService.user.findFirst({
            where: { username },
        });

        if (!user) {
            throw new NotFoundException(`User ${username} does not exist`);
        }
        return this.chatService.getUserChannels(username);
    }

    @Get('channel/:channel_name')
    async getChannel(@Param('channel_name') channelName: string) {
        console.log('channelName', channelName);
        return this.chatService.getChannel(channelName);
    }
}
