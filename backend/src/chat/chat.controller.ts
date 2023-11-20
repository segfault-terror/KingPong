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
import { ForbiddenException } from '@nestjs/common';

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
    async getChannel(
        @Param('channel_name') channelName: string,
        @Req() request: any,
    ) {
        return this.chatService.getChannel(channelName, request.user.id);
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
        return this.chatService.joinChannel(
            data.channelName,
            request.user.username,
            data.password,
        );
    }

    @Post('channel/join/private')
    async joinPrivateChannel(
        @Body() data: { inviteCode: string },
        @Req() request: any,
    ) {
        return this.chatService.joinPrivateChannel(
            data.inviteCode,
            request.user.username,
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
        @Req() request: any,
    ) {
        return this.chatService.editChannel(
            oldName,
            data,
            request.user.username,
        );
    }

    @Post('/channel/:channel_name/ban')
    async banUser(
        @Param('channel_name') channelName: string,
        @Body() data: { usernameToBan: string },
        @Req() request: any,
    ) {
        return this.chatService.banUser(
            channelName,
            request.user.username,
            data.usernameToBan,
        );
    }

    @Get('/channel/:channel_name/ban-list')
    async getBanList(
        @Param('channel_name') channelName: string,
        @Req() request: any,
    ) {
        return this.chatService.getBanList(channelName, request.user.username);
    }

    @Post('/channel/:channel_name/unban')
    async unbanUser(
        @Param('channel_name') channelName: string,
        @Body() data: { usernameToUnban: string },
        @Req() request: any,
    ) {
        return this.chatService.unbanUser(
            channelName,
            request.user.username,
            data.usernameToUnban,
        );
    }

    @Post('/channel/:channel_name/kick')
    async kickUser(
        @Param('channel_name') channelName: string,
        @Body() data: { usernameToKick: string },
        @Req() request: any,
    ) {
        return this.chatService.kickUser(
            channelName,
            request.user.username,
            data.usernameToKick,
        );
    }

    @Post('/channel/:channel_name/mute')
    async muteUser(
        @Param('channel_name') channelName: string,
        @Body()
        data: {
            usernameToMute: string;
            muteDuration: number;
        },
        @Req() request: any,
    ) {
        return this.chatService.muteUser(
            channelName,
            request.user.username,
            data.usernameToMute,
            data.muteDuration,
        );
    }

    @Get('/channel/:channel_name/mute-list')
    async getMuteList(
        @Param('channel_name') channelName: string,
        @Req() request: any,
    ) {
        return this.chatService.getMuteList(channelName, request.user.username);
    }

    @Get('/channel/:channel_name/unmute-list')
    async getUnmuteList(
        @Param('channel_name') channelName: string,
        @Req() request: any,
    ) {
        return this.chatService.getUnmuteList(
            channelName,
            request.user.username,
        );
    }

    @Post('/channel/:channel_name/unmute')
    async unmuteUser(
        @Param('channel_name') channelName: string,
        @Body() data: { usernameToUnmute: string },
        @Req() request: any,
    ) {
        const channel = await this.prismaService.channel.findFirst({
            where: { name: channelName },
            select: {
                bannedUsers: {
                    select: { username: true },
                },
                members: {
                    select: { username: true },
                },
                admins: {
                    select: { username: true },
                },
                mutes: {
                    select: {
                        user: {
                            select: { username: true },
                        },
                    },
                },
            },
        });
        if (!channel) {
            throw new NotFoundException(`Channel ${channelName} not found`);
        }

        if (
            channel.bannedUsers.some(
                (b) => b.username === request.user.username,
            )
        ) {
            throw new ForbiddenException(`You are banned from ${channelName}`);
        }

        if (channel.members.some((m) => m.username === request.user.username)) {
            throw new ForbiddenException('Members are not allowed to un-mute');
        }

        if (
            channel.admins.some((a) => a.username === request.user.username) &&
            channel.admins.some((a) => a.username === data.usernameToUnmute)
        ) {
            throw new ForbiddenException(
                'Admins are not allowed to un-mute other admins',
            );
        }

        if (
            channel.mutes.every(
                (m) => m.user.username !== data.usernameToUnmute,
            )
        ) {
            throw new NotFoundException(
                `${data.usernameToUnmute} is not muted`,
            );
        }

        this.chatService.unmuteUser(channelName, data.usernameToUnmute);
    }

    @Get('/channel/:channel_name/is-muted/:username')
    async isMuted(
        @Param('channel_name') channelName: string,
        @Param('username') username: string,
    ) {
        return this.chatService.isMuted(channelName, username);
    }

    @Post('/channel/:channel_name/new-admin')
    async setAdmin(
        @Param('channel_name') channelName: string,
        @Req() request: any,
        @Body() data: { username: string },
    ) {
        return this.chatService.setAdmin(
            channelName,
            request.user.username,
            data.username,
        );
    }

    @Post('/channel/:channel_name/remove-admin')
    async removeAdmin(
        @Param('channel_name') channelName: string,
        @Req() request: any,
        @Body() data: { username: string },
    ) {
        return this.chatService.removeAdmin(
            channelName,
            request.user.username,
            data.username,
        );
    }
}
