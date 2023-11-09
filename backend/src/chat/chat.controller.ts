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
import { PrismaService } from 'nestjs-prisma';
import { AuthGard } from 'src/auth/auth.guard';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create.message.dto';
import { JoinChannelDto } from './dto/join.channel.dto';
import { CreateChannelDto } from './dto/create.channel.dto';
import { UpdateChannelDto } from './dto/update.channel.dto';

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
        /* TODO: Check if user is not in channel
         * If a user is not in a channel, they should not be able to see it
         * but they should be able to enter its name in the URL bar and access it without joining
         * This is a security issue
         */
        console.log('channelName', channelName);
        return this.chatService.getChannel(channelName);
    }

    @Get('/channel/:channel_name/members')
    async getChannelMembers(@Param('channel_name') channelName: string) {
        return this.chatService.getChannelMembers(channelName);
    }

    @Get('channels/join/explore')
    async exploreChannels(@Req() request: any) {
        return this.chatService.exploreChannels(request.user.username);
    }

    @Post('channel/join')
    async joinChannel(@Body() data: JoinChannelDto, @Req() request: any) {
        console.log(`data: ${JSON.stringify(data)}`);
        return this.chatService.joinChannel(
            data.channelName,
            request.user.username,
            data.password,
        );
    }

    @Post('channel/create')
    async createChannel(@Body() data: CreateChannelDto, @Req() request: any) {
        return this.chatService.createChannel(
            request.user.username,
            data.channelName,
            data.channelType,
            data.password,
        );
    }

    @Post('/channel/message')
    async sendMessageToChannel(@Body() data: any, @Req() request: any) {
        return this.chatService.sendMessageToChannel(
            data.channelName,
            request.user.username,
            data.content,
        );
    }

    @Delete('/channel/:channel_name')
    async deleteChannel(
        @Param('channel_name') channelName: string,
        @Req() request: any,
    ) {
        console.log(`[chat] DELETE /channel/${channelName}`);
        return this.chatService.deleteChannel(
            channelName,
            request.user.username,
        );
    }

    @Delete('/channel/leave/:channel_name')
    async leaveChannel(
        @Param('channel_name') channelName: string,
        @Req() request: any,
    ) {
        return this.chatService.leaveChannel(
            channelName,
            request.user.username,
        );
    }

    @Post('/channel/change-owner')
    async changeChannelOwner(
        @Body() data: { channelName: string; newOwner: string },
        @Req() request: any,
    ) {
        return this.chatService.changeOwner(
            data.channelName,
            request.user.id,
            data.newOwner,
        );
    }

    @Post('/channel/:channel_name/edit')
    async editChannel(
        @Param('channel_name') oldName: string,
        @Body() data: UpdateChannelDto,
    ) {
        return this.chatService.editChannel(oldName, data);
    }
}
