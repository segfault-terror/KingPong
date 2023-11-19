import {
    BadRequestException,
    ForbiddenException,
    ImATeapotException,
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { ChannelType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'nestjs-prisma';
import { UserService } from 'src/user/user.service';
import { UpdateChannelDto } from './dto/update.channel.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class ChatService {
    readonly logger = new Logger(ChatService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) {}

    async getConversation(username1: string, username2: string) {
        const user1 = await this.prisma.user.findUnique({
            where: {
                username: username1,
            },
        });
        const user2 = await this.prisma.user.findUnique({
            where: {
                username: username2,
            },
        });

        if (!user1) {
            throw new NotFoundException(`User ${username1} does not exist`);
        }
        if (!user2) {
            throw new NotFoundException(`User ${username2} does not exist`);
        }

        const { isFriend, isMe } = await this.userService.isFriend(
            username1,
            username2,
        );
        if (isMe) {
            throw new ImATeapotException('You cannot message yourself');
        }
        if (!isFriend) {
            throw new BadRequestException(
                `User ${username1} is not friend with ${username2}`,
            );
        }

        const result = await this.prisma.dM.findFirst({
            where: {
                OR: [
                    {
                        AND: [
                            { user1: { username: username1 } },
                            { user2: { username: username2 } },
                        ],
                    },
                    {
                        AND: [
                            { user1: { username: username2 } },
                            { user2: { username: username1 } },
                        ],
                    },
                ],
            },
            select: {
                id: true,
                user1_first_message: true,
                user2_first_message: true,
                user1: {
                    select: { username: true },
                },
                user2: {
                    select: { username: true },
                },
                messages: {
                    select: {
                        id: true,
                        content: true,
                        sender: {
                            select: {
                                id: true,
                                username: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
            },
        });

        if (!result) {
            const newDM = await this.prisma.dM.create({
                data: {
                    user1: { connect: { username: username1 } },
                    user2: { connect: { username: username2 } },
                },
                select: {
                    user1: {
                        select: { username: true },
                    },
                    user2: {
                        select: { username: true },
                    },
                    messages: {
                        select: {
                            id: true,
                            content: true,
                            sender: {
                                select: {
                                    id: true,
                                    username: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: 'asc',
                        },
                    },
                },
            });
            return newDM;
        }

        const firstMessage =
            username1 === result.user1.username
                ? result.user1_first_message
                : result.user2_first_message;

        result.messages = result.messages.slice(firstMessage);
        return result;
    }

    async getBriefDMs(username: string) {
        const count = await this.prisma.user.count({
            where: {
                username,
            },
        });
        if (count == 0) {
            throw new NotFoundException(`User ${username} does not exist`);
        }

        const result = await this.prisma.dM.findMany({
            where: {
                OR: [
                    {
                        user1: { username },
                    },
                    {
                        user2: { username },
                    },
                ],
            },
            select: {
                id: true,
                user1_first_message: true,
                user2_first_message: true,
                user1: {
                    select: {
                        username: true,
                        avatar: true,
                        status: true,
                    },
                },
                user2: {
                    select: {
                        username: true,
                        avatar: true,
                        status: true,
                    },
                },
                messages: {
                    select: {
                        content: true,
                        sender: {
                            select: {
                                id: true,
                                username: true,
                            },
                        },
                        createdAt: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });

        const filteredResult = result.filter((result) => {
            const firstMessage =
                username === result.user1.username
                    ? result.user1_first_message
                    : result.user2_first_message;

            const slicedMessages = result.messages.slice(firstMessage);
            return slicedMessages.length > 0;
        });

        function sortDMs(dm1: any, dm2: any) {
            const dm1_lastMessage = dm1.messages[0];
            const dm2_lastMessage = dm2.messages[0];

            if (dm1_lastMessage.createdAt > dm2_lastMessage.createdAt)
                return -1;
            else if (dm1_lastMessage.createdAt < dm2_lastMessage.createdAt)
                return 1;
            else return 0;
        }

        return filteredResult.sort(sortDMs);
    }

    async createMessage(
        content: string,
        senderUsername: string,
        receiverUsername: string,
    ) {
        const sender = await this.prisma.user.findFirst({
            where: { username: senderUsername },
            select: { id: true },
        });

        const receiver = await this.prisma.user.findFirst({
            where: { username: receiverUsername },
            select: { id: true },
        });

        let dm = await this.prisma.dM.findFirst({
            where: {
                OR: [
                    {
                        user1Id: sender.id,
                        user2Id: receiver.id,
                    },
                    {
                        user1Id: receiver.id,
                        user2Id: sender.id,
                    },
                ],
            },
            select: { id: true },
        });

        if (dm == null) {
            dm = await this.prisma.dM.create({
                data: {
                    user1: { connect: { id: sender.id } },
                    user2: { connect: { id: receiver.id } },
                },
            });
        }

        await this.prisma.message.create({
            data: {
                content,
                sender: { connect: { id: sender.id } },
                dm: { connect: { id: dm.id } },
            },
        });
    }

    async deleteDM(dmId: string, userId: string) {
        const count = await this.prisma.message.count({
            where: {
                dm_id: dmId,
            },
        });

        const dm = await this.prisma.dM.findUnique({
            where: {
                id: dmId,
            },
            select: {
                user1Id: true,
                user2Id: true,
                user1_first_message: true,
                user2_first_message: true,
            },
        });

        if (userId === dm.user1Id) {
            dm.user1_first_message = count;
        } else {
            dm.user2_first_message = count;
        }

        await this.prisma.dM.update({
            where: {
                id: dmId,
            },
            data: {
                user1_first_message: dm.user1_first_message,
                user2_first_message: dm.user2_first_message,
            },
        });
    }

    async getUserChannels(username: string) {
        // Not banned AND joined the channel (Owner, Admin or Member)
        const channels = await this.prisma.channel.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            bannedUsers: {
                                some: { username },
                            },
                        },
                    },
                    {
                        OR: [
                            {
                                owner: { username },
                            },
                            {
                                admins: {
                                    some: { username },
                                },
                            },
                            {
                                members: {
                                    some: { username },
                                },
                            },
                        ],
                    },
                ],
            },
            select: {
                id: true,
                name: true,
                type: true,
                inviteCode: true,
                ownerId: true,
                createdAt: true,
                messages: true,
            },
        });

        const sortedChannels = channels.sort((c1: any, c2: any) => {
            const c1_lastMessage = c1.messages[c1.messages.length - 1];
            const c2_lastMessage = c2.messages[c2.messages.length - 1];

            if (c1_lastMessage.createdAt > c2_lastMessage.createdAt) {
                return -1;
            } else if (c1_lastMessage.createdAt < c2_lastMessage.createdAt) {
                return 1;
            } else return 0;
        });

        return sortedChannels.map((channel) => {
            delete channel.messages;
            return channel;
        });
    }

    async getChannel(channelName: string) {
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            select: {
                name: true,
                type: true,
                owner: {
                    select: { username: true },
                },
                admins: {
                    // Exclude banned admins
                    where: {
                        NOT: {
                            bannedChannels: {
                                some: { name: channelName },
                            },
                        },
                    },
                    select: { username: true },
                },
                messages: {
                    select: {
                        id: true,
                        content: true,
                        sender: {
                            select: { avatar: true, username: true },
                        },
                    },
                    orderBy: { createdAt: 'asc' },
                },
                inviteCode: true,
                bannedUsers: {
                    select: { username: true },
                },
            },
        });

        if (!channel) {
            throw new NotFoundException(`Channel ${channelName} not found`);
        }
        return channel;
    }

    async getChannelMembers(channelName: string) {
        return this.prisma.channel.findFirst({
            where: { name: channelName },
            select: {
                owner: {
                    select: {
                        id: true,
                        username: true,
                        fullname: true,
                        avatar: true,
                        status: true,
                    },
                },
                admins: {
                    // Exclude banned admins
                    where: {
                        NOT: {
                            bannedChannels: {
                                some: { name: channelName },
                            },
                        },
                    },
                    select: {
                        id: true,
                        username: true,
                        fullname: true,
                        avatar: true,
                        status: true,
                    },
                },
                members: {
                    // Exclude banned members
                    where: {
                        NOT: {
                            bannedChannels: {
                                some: { name: channelName },
                            },
                        },
                    },
                    select: {
                        id: true,
                        username: true,
                        fullname: true,
                        avatar: true,
                        status: true,
                    },
                },
            },
        });
    }

    async exploreChannels(username: string) {
        return this.prisma.channel.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            OR: [
                                { owner: { username } },
                                { admins: { some: { username } } },
                                { members: { some: { username } } },
                                { bannedUsers: { some: { username } } },
                            ],
                        },
                    },
                    { NOT: { type: ChannelType.PRIVATE } },
                ],
            },
        });
    }

    async joinChannel(
        channelName: string,
        username: string,
        password?: string,
    ) {
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            select: {
                password: true,
                type: true,
                members: true,
                admins: true,
                bannedUsers: true,
                inviteCode: true,
            },
        });

        if (!channel) {
            throw new NotFoundException(`Channel ${channelName} not found`);
        }

        // Check if user is banned, if so they cannot join
        if (channel.bannedUsers.find((user) => user.username === username)) {
            throw new ForbiddenException(
                'You are banned from channel ${channelName}',
            );
        }

        // Check if user is not already joined
        if (
            channel.members.find((member) => member.username === username) ||
            channel.admins.find((admin) => admin.username === username)
        ) {
            throw new BadRequestException(
                `You are already a member in ${channelName}`,
            );
        }

        if (channel.type === ChannelType.PROTECTED) {
            if (!password) {
                throw new BadRequestException(
                    `Channel ${channelName} is protected, you must provide a password`,
                );
            }

            if (!(await bcrypt.compare(password, channel.password))) {
                throw new UnauthorizedException('Invalid password');
            }
        } else if (channel.type === ChannelType.PRIVATE) {
            throw new BadRequestException(
                'Cannot join private channels through this endpoint',
            );
        }

        const user = await this.prisma.user.findFirst({
            where: { username },
            select: {
                id: true,
            },
        });

        await this.prisma.channel.update({
            where: { name: channelName },
            data: {
                members: { connect: { id: user.id } },
            },
        });
    }

    async joinPrivateChannel(inviteCode: string, requestUsername: string) {
        const channel = await this.prisma.channel.findFirst({
            where: { inviteCode },
            select: {
                name: true,
                bannedUsers: {
                    select: { username: true },
                },
            },
        });
        if (!channel) {
            throw new NotFoundException('There is no channel with this code');
        }

        if (
            channel.bannedUsers.some((ban) => ban.username === requestUsername)
        ) {
            throw new ForbiddenException(
                `You are baned in the channel ${channel.name}`,
            );
        }

        const user = await this.prisma.user.findFirst({
            where: { username: requestUsername },
            select: { id: true },
        });
        await this.prisma.channel.update({
            where: { name: channel.name },
            data: {
                members: { connect: { id: user.id } },
            },
        });
        return { name: channel.name };
    }

    async createChannel(
        ownerName: string,
        name: string,
        type: string,
        password?: string,
    ) {
        // Protected channels must have a password
        if (type === 'PROTECTED' && !password) {
            throw new BadRequestException(
                'You must provide a password for a protected channel',
            );
        }

        // Public and private channels cannot have a password
        if (type !== 'PROTECTED' && password) {
            throw new BadRequestException(
                'You cannot provide a password for a public or private channel',
            );
        }

        // Check if channel already exists
        const channel = await this.prisma.channel.findFirst({
            where: { name },
        });
        if (channel) {
            throw new BadRequestException(
                `Channel ${name} already exists, please choose another name`,
            );
        }

        // Check if owner exists
        const owner = await this.prisma.user.findFirst({
            where: { username: ownerName },
            select: { id: true },
        });
        if (!owner)
            throw new NotFoundException(`User ${ownerName} does not exist`);

        const channelType =
            type === 'PUBLIC'
                ? ChannelType.PUBLIC
                : type === 'PROTECTED'
                ? ChannelType.PROTECTED
                : ChannelType.PRIVATE;

        return await this.prisma.channel.create({
            data: {
                name,
                type: channelType,
                password,
                inviteCode:
                    channelType === ChannelType.PRIVATE ? nanoid(10) : null,
                owner: { connect: { id: owner.id } },
            },
        });
    }

    async sendMessageToChannel(
        channelName: string,
        username: string,
        content: string,
    ) {
        // Check if channel exists
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            select: {
                id: true,
                owner: true,
                admins: true,
                members: true,
                mutes: {
                    select: {
                        expiresAt: true,
                        user: {
                            select: { username: true },
                        },
                    },
                },
                bannedUsers: true,
            },
        });
        if (!channel) {
            throw new NotFoundException(
                `Channel ${channelName} does not exist`,
            );
        }

        // Check if user exists
        const user = await this.prisma.user.findFirst({
            where: { username },
            select: { id: true },
        });
        if (!user) {
            throw new NotFoundException(`User ${username} does not exist`);
        }

        // Check if user is not banned
        if (channel.bannedUsers.some((user) => user.username === username)) {
            throw new BadRequestException(
                `User ${username} is banned from channel ${channelName}`,
            );
        }

        // Check if user is in channel
        if (
            username !== channel.owner.username &&
            channel.admins.every((admin) => admin.username !== username) &&
            channel.members.every((member) => member.username !== username)
        ) {
            throw new BadRequestException(
                `User ${username} is not in channel ${channelName}`,
            );
        }

        // Check if user is not muted

        const userMute = channel.mutes.find(
            (mute) => mute.user.username === username,
        );

        if (userMute && userMute.expiresAt > new Date()) {
            throw new ForbiddenException(`You are muted in ${channelName}`);
        } else {
            // NOTE: await is not necessary here
            this.unmuteUser(channelName, username);
        }

        return await this.prisma.channelMessage.create({
            data: {
                content,
                sender: { connect: { id: user.id } },
                channel: { connect: { id: channel.id } },
            },
        });
    }

    async deleteChannel(channelName: string, username: string) {
        const user = await this.prisma.user.findFirst({
            where: { username },
            select: { id: true },
        });
        if (!user) {
            throw new NotFoundException(`User ${username} not found`);
        }

        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            select: {
                id: true,
                owner: {
                    select: { username: true },
                },
            },
        });

        if (!channel) {
            throw new NotFoundException(`Channel ${channelName} not found`);
        }

        if (channel.owner.username !== username) {
            throw new UnauthorizedException(
                `User ${username} is not the owner of channel ${channelName}`,
            );
        }

        await this.prisma.channelMessage.deleteMany({
            where: { channelId: channel.id },
        });

        return await this.prisma.channel.delete({
            where: { id: channel.id },
        });
    }

    async leaveChannel(channelName: string, username: string) {
        const user = await this.prisma.user.findFirst({
            where: { username },
            select: { id: true },
        });
        if (!user) {
            throw new NotFoundException(`User ${username} not found`);
        }

        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            select: {
                id: true,
                owner: {
                    select: { username: true },
                },
                bannedUsers: true,
            },
        });
        if (!channel) {
            throw new NotFoundException(`Channel ${channelName} not found`);
        }

        if (channel.owner.username === username) {
            throw new BadRequestException(
                `User ${username} is the owner of channel ${channelName}, cannot leave`,
            );
        }

        // Check if user is banned
        if (channel.bannedUsers.some((user) => user.username === username)) {
            throw new ForbiddenException(
                `User ${username} is banned from ${channelName}`,
            );
        }

        await this.prisma.channel.update({
            where: { id: channel.id },
            data: {
                members: {
                    disconnect: { id: user.id },
                },
                admins: {
                    disconnect: { id: user.id },
                },
            },
        });
    }

    async changeOwner(
        channelName: string,
        prevOwnerId: string,
        newOwnerUsename: string,
    ) {
        // Check if channel exists
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            select: {
                owner: {
                    select: { id: true },
                },
                id: true,
            },
        });
        if (!channel) {
            throw new NotFoundException(
                `Channel ${channelName} does not exist`,
            );
        }

        // Check if request user is the real owner
        if (prevOwnerId !== channel.owner.id) {
            throw new UnauthorizedException(
                `You are not owner of the channel ${channelName}`,
            );
        }

        // Check if the new owner exists
        const newOwner = await this.prisma.user.findFirst({
            where: { username: newOwnerUsename },
        });
        if (!newOwner) {
            throw new NotFoundException(
                `User ${newOwnerUsename} does not exist`,
            );
        }

        // Check if the new owner is a member
        const isMember = await this.prisma.channel.findFirst({
            where: {
                name: channelName,
                OR: [
                    {
                        members: { some: { id: newOwner.id } },
                    },
                    {
                        admins: { some: { id: newOwner.id } },
                    },
                ],
            },
        });

        if (!isMember) {
            throw new BadRequestException(
                `User ${newOwnerUsename} is not a member in channel ${channelName}`,
            );
        }

        await this.prisma.mute.deleteMany({
            where: {
                channelId: channel.id,
                userId: newOwner.id,
            },
        });

        // Remove current owner and set new owner
        return await this.prisma.channel.update({
            where: { name: channelName },
            data: {
                owner: { connect: { id: newOwner.id } },
                members: {
                    connect: { id: prevOwnerId },
                    disconnect: { id: newOwner.id },
                },
                admins: {
                    disconnect: { id: newOwner.id },
                },
            },
        });

        // NOTE: If newOwner is the same as the current owner,
        // it will get replaced by itself
    }

    async editChannel(
        oldName: string,
        data: UpdateChannelDto,
        username: string,
    ) {
        // Check if channel exists
        const channel = await this.prisma.channel.findFirst({
            where: { name: oldName },
            include: { owner: true },
        });
        if (!channel) {
            throw new NotFoundException(`Channel ${oldName} does not exist`);
        }

        // Check if request user is the real owner
        if (channel.owner.username !== username) {
            throw new UnauthorizedException(
                `User ${username} is not the owner of channel ${oldName}`,
            );
        }

        // Check if the new name is not taken
        if (data.newName && data.newName !== oldName) {
            const channelWithNewName = await this.prisma.channel.findFirst({
                where: { name: data.newName },
            });
            if (channelWithNewName) {
                throw new BadRequestException(
                    `Channel '${data.newName}' already exists`,
                );
            }
        }

        // If new type is protected a password must be provided
        if (data.newType === 'PROTECTED' && !data.password) {
            throw new BadRequestException(
                'Password must be provided for protected channels',
            );
        }

        // If new type is public or private, password must not be provided
        if (data.newType !== 'PROTECTED' && data.password) {
            throw new BadRequestException(
                'Password must not be provided for public and protected channels',
            );
        }

        // Update channel data
        channel.name = data.newName ?? channel.name;
        channel.type = data.newType ?? channel.type;
        channel.password = data.password ?? channel.password;

        return await this.prisma.channel.update({
            where: { id: channel.id },
            data: {
                name: channel.name,
                type: channel.type,
                password: channel.password,
            },
        });
    }

    async banUser(
        channelName: string,
        requestUsername: string,
        usernameToBan: string,
    ) {
        // Check if channel exists
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            include: {
                owner: true,
                admins: true,
                members: true,
                bannedUsers: true,
            },
        });
        if (!channel) {
            throw new NotFoundException(`Channel ${channelName} not found`);
        }

        // Check if user to ban exists
        const userToBan = await this.prisma.user.findFirst({
            where: { username: usernameToBan },
        });
        if (!userToBan) {
            throw new NotFoundException(`User ${usernameToBan} not found`);
        }

        // if request user is admin, check if user to ban is not owner or another admin
        if (
            channel.admins.some((admin) => admin.username === requestUsername)
        ) {
            if (
                channel.admins.some((admin) => admin.username === usernameToBan)
            ) {
                throw new ForbiddenException(
                    `${usernameToBan} is an admin, cannot ban`,
                );
            }

            if (channel.owner.username === usernameToBan) {
                throw new UnauthorizedException(
                    `${usernameToBan} is the owner, cannot ban`,
                );
            }
        }

        // If request user is a member, throw forbidden exception
        if (
            channel.members.some(
                (member) => member.username === requestUsername,
            )
        ) {
            throw new ForbiddenException(
                `User ${requestUsername} is not an admin in channel ${channelName}`,
            );
        }

        // You cannot ban yourself
        if (requestUsername === usernameToBan) {
            throw new ImATeapotException('You cannot ban yourself stupid');
        }

        // Ban the user
        return await this.prisma.channel.update({
            where: { name: channelName },
            data: {
                bannedUsers: {
                    connect: { id: userToBan.id },
                },
            },
        });
    }

    async getBanList(channelName: string, username: string) {
        // If request user does not exist, he will be unauthorized

        // Check if channel exists
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            include: {
                owner: true,
                admins: true,
                members: true,
                bannedUsers: {
                    select: {
                        username: true,
                        fullname: true,
                        avatar: true,
                    },
                },
            },
        });
        if (!channel) {
            throw new NotFoundException(`Channel ${channelName} not found`);
        }

        // If request user is banned, throw ForbiddenException
        if (
            channel.bannedUsers.some(
                (bannedUser) => bannedUser.username === username,
            )
        ) {
            throw new ForbiddenException('Banned users access ban list');
        }

        // If request user is a member, throw UnauthorizedException
        if (channel.members.some((member) => member.username === username)) {
            throw new ForbiddenException(
                'Regular members cannot access ban list',
            );
        }

        // If request user is an admin, return banned users only (exclude banned admins)
        if (channel.admins.some((admin) => admin.username === username)) {
            return channel.bannedUsers.filter((bannedUser) => {
                // If banned user was an admin remove it from the list
                const notAnAdmin = !channel.admins.some(
                    (admin) => admin.username === bannedUser.username,
                );
                return notAnAdmin;
            });
        }

        // If request user is the owner, return the whole ban list
        return channel.bannedUsers;
    }

    async unbanUser(
        channelName: string,
        requestUsername: string,
        usernameToUnban: string,
    ) {
        // Check if channel exists
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            include: {
                bannedUsers: {
                    select: { username: true },
                },
                members: {
                    select: { username: true },
                },
                admins: {
                    select: { username: true },
                },
            },
        });
        if (!channel) {
            throw new NotFoundException(
                `Channel ${channelName} does not exist`,
            );
        }

        // Check if username to ban is really banned
        if (
            !channel.bannedUsers.some(
                (bannedUser) => bannedUser.username === usernameToUnban,
            )
        ) {
            throw new BadRequestException(
                `User ${usernameToUnban} is either not a memeber or not banned`,
            );
        }

        // If request user is a regular member, throw UnauthorizedException
        const isRegularMember = channel.members.some(
            (member) => member.username === requestUsername,
        );
        if (isRegularMember) {
            throw new UnauthorizedException('You are not allowed to un-ban');
        }

        // If request user is an admin, check if username to unban was an admin, if so throw UnauthorizedException
        const isAdmin = channel.admins.some(
            (admin) => admin.username === requestUsername,
        );
        if (isAdmin) {
            if (
                channel.admins.some(
                    (admin) => admin.username === usernameToUnban,
                )
            ) {
                throw new UnauthorizedException(
                    'You are not allowed to un-ban an ex-admin',
                );
            }
        }

        // else, unban the user
        return await this.prisma.channel.update({
            where: { name: channelName },
            data: {
                bannedUsers: {
                    disconnect: { username: usernameToUnban },
                },
                members: {
                    disconnect: { username: usernameToUnban },
                },
                admins: {
                    disconnect: { username: usernameToUnban },
                },
            },
        });
    }

    async kickUser(
        channelName: string,
        requestUsername: string,
        usernameToKick: string,
    ) {
        // Check if channel exists
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            include: {
                bannedUsers: { select: { username: true } },
                members: { select: { username: true } },
                admins: { select: { username: true } },
                owner: { select: { username: true } },
            },
        });
        if (!channel) {
            throw new NotFoundException(
                `Channel ${channelName} does not exist`,
            );
        }

        // Check if request user is a member, if so throw ForbiddenException
        if (channel.members.some((m) => m.username === requestUsername)) {
            throw new ForbiddenException(
                'Regular members cannot kick other users',
            );
        }

        // Check if username to kick is banned
        if (channel.bannedUsers.some((b) => b.username === usernameToKick)) {
            throw new BadRequestException(
                `User ${usernameToKick} is banned from channel ${channelName}`,
            );
        }

        // It's impossible to kick the owner
        if (channel.owner.username === usernameToKick) {
            throw new ForbiddenException('Channel owner cannot be kicked');
        }

        // Check if request user is an admin and the user to kick is an admin, throw UnauthorizedException
        if (
            channel.admins.some((a) => a.username === requestUsername) &&
            channel.admins.some((a) => a.username === usernameToKick)
        ) {
            throw new UnauthorizedException(`Admin cannot kick another admin`);
        }

        // Check if you're kicking yourself
        if (requestUsername === usernameToKick) {
            throw new ImATeapotException(
                'Wanna kick yourself, are you stupid?',
            );
        }

        // Kick the user
        return await this.prisma.channel.update({
            where: { name: channelName },
            data: {
                members: { disconnect: { username: usernameToKick } },
                admins: { disconnect: { username: usernameToKick } },
            },
        });
    }

    async muteUser(
        channelName: string,
        requestUsername: string,
        usernameToMute: string,
        muteDuration: number,
    ) {
        // Check if channel exists
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            select: {
                id: true,
                owner: { select: { username: true } },
                admins: { select: { username: true } },
                members: { select: { username: true } },
                bannedUsers: { select: { username: true } },
                mutes: {
                    select: {
                        expiresAt: true,
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

        // Check if request user is member, if so throw ForbiddenException
        if (channel.members.some((m) => m.username === requestUsername)) {
            throw new ForbiddenException(
                'Regular members cannot mute other users',
            );
        }

        // Check if user to mute is not banned
        if (channel.bannedUsers.some((b) => b.username === usernameToMute)) {
            throw new BadRequestException(
                `User ${usernameToMute} is banned from ${channelName}`,
            );
        }

        // Check if request user is admin, and the user to mute is also admin, throw UnauthorizedException
        if (
            channel.admins.some((a) => a.username === requestUsername) &&
            channel.admins.some((a) => a.username === usernameToMute)
        ) {
            throw new UnauthorizedException('Admin cannot mute another admin');
        }

        const mute = channel.mutes.find(
            (m) => m.user.username === usernameToMute,
        );

        // Check if the user was muted, but the mute has expired
        if (mute && mute.expiresAt > new Date()) {
            this.unmuteUser(channelName, usernameToMute);
        } else if (mute && mute.expiresAt < new Date()) {
            throw new BadRequestException(
                `User ${usernameToMute} is already muted`,
            );
        }

        // Mute the user
        const user = await this.prisma.user.findFirst({
            where: { username: usernameToMute },
            select: { id: true },
        });
        return await this.prisma.mute.create({
            data: {
                channel: { connect: { id: channel.id } },
                user: { connect: { id: user.id } },
                expiresAt: new Date(Date.now() + muteDuration * 1000),
            },
        });
    }

    async unmuteUser(channelName: string, username: string) {
        const mute = await this.prisma.mute.findFirst({
            where: {
                channel: { name: channelName },
                user: { username },
            },
            select: { id: true },
        });

        if (!mute) return;

        await this.prisma.mute.delete({
            where: { id: mute.id },
        });
    }

    async getMuteList(channelName: string, requestUsername: string) {
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            select: {
                members: {
                    select: {
                        id: true,
                        fullname: true,
                        username: true,
                        avatar: true,
                    },
                },
                admins: {
                    select: {
                        id: true,
                        fullname: true,
                        username: true,
                        avatar: true,
                    },
                },
                bannedUsers: {
                    select: { username: true },
                },
                mutes: {
                    select: {
                        expiresAt: true,
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
            channel.members.some((m) => m.username === requestUsername) ||
            channel.bannedUsers.some((b) => b.username === requestUsername)
        ) {
            throw new ForbiddenException(
                'Only owner and admins can access mute list',
            );
        }

        if (channel.admins.some((a) => a.username === requestUsername)) {
            channel.admins = [];
        }

        channel.members = channel.members.filter((member) => {
            const mute = channel.mutes.find(
                (mute) => mute.user.username === member.username,
            );
            return !mute || mute.expiresAt < new Date();
        });

        channel.admins = channel.admins.filter((admin) => {
            const mute = channel.mutes.find(
                (mute) => mute.user.username === admin.username,
            );
            return !mute || mute.expiresAt < new Date();
        });

        return { admins: channel.admins, members: channel.members };
    }

    async getUnmuteList(channelName: string, requestUsername: string) {
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            select: {
                members: {
                    select: {
                        id: true,
                        fullname: true,
                        username: true,
                        avatar: true,
                    },
                },
                admins: {
                    select: {
                        id: true,
                        fullname: true,
                        username: true,
                        avatar: true,
                    },
                },
                bannedUsers: {
                    select: { username: true },
                },
                mutes: {
                    select: {
                        expiresAt: true,
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
            channel.members.some((m) => m.username === requestUsername) ||
            channel.bannedUsers.some((b) => b.username === requestUsername)
        ) {
            throw new ForbiddenException(
                'Only owner and admins can access mute list',
            );
        }

        if (channel.admins.some((a) => a.username === requestUsername)) {
            channel.admins = [];
        }

        channel.members = channel.members.filter((member) => {
            const mute = channel.mutes.find(
                (mute) => mute.user.username === member.username,
            );
            return mute && mute.expiresAt > new Date();
        });

        channel.admins = channel.admins.filter((admin) => {
            const mute = channel.mutes.find(
                (mute) => mute.user.username === admin.username,
            );
            return mute && mute.expiresAt > new Date();
        });

        return { admins: channel.admins, members: channel.members };
    }

    async isMuted(channelName: string, username: string) {
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            select: {
                owner: {
                    select: { username: true },
                },
                admins: {
                    select: { username: true },
                },
                members: {
                    select: { username: true },
                },
                mutes: {
                    select: {
                        expiresAt: true,
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

        if (channel.owner.username === username) {
            return { isMuted: false };
        }

        if (
            channel.admins.every((a) => a.username !== username) &&
            channel.members.every((m) => m.username !== username)
        ) {
            throw new BadRequestException(
                `${username} is not a member in ${channelName}`,
            );
        }

        const mute = channel.mutes.find((m) => m.user.username === username);

        if (mute && mute.expiresAt > new Date()) {
            return {
                isMuted: true,
                expiresAt: mute.expiresAt,
            };
        }
        this.unmuteUser(channelName, username);
        return { isMuted: false };
    }

    async setAdmin(
        channelName: string,
        requestUsername: string,
        username: string,
    ) {
        // Check if channel exists
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            select: {
                owner: { select: { username: true } },
                admins: { select: { username: true } },
            },
        });
        if (!channel) {
            throw new NotFoundException(`Channel ${channelName} not found`);
        }

        // Check if request user is owner
        if (channel.owner.username !== requestUsername) {
            throw new UnauthorizedException('Only the owner can set admins');
        }

        // Check if user to set admin is not owner
        if (channel.owner.username === username) {
            throw new BadRequestException('You cannot set yourself as admin');
        }

        // Check if user to set already an admin
        if (channel.admins.some((a) => a.username === username)) {
            throw new BadRequestException(
                `${username} is already an admin in ${channelName}`,
            );
        }

        // Set new admin
        return await this.prisma.channel.update({
            where: { name: channelName },
            data: {
                members: { disconnect: { username } },
                admins: { connect: { username } },
            },
        });
    }

    async removeAdmin(
        channelName: string,
        requestUsername: string,
        username: string,
    ) {
        // Check if channel exists
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            select: {
                owner: { select: { username: true } },
                admins: { select: { username: true } },
            },
        });
        if (!channel) {
            throw new NotFoundException(`Channel ${channelName} not found`);
        }

        // Check if request user is owner
        if (channel.owner.username !== requestUsername) {
            throw new UnauthorizedException('Only the owner can set admins');
        }

        if (channel.owner.username === username) {
            throw new BadRequestException('Owner cannot be an admin');
        }

        // Check if user to set is not an admin
        if (channel.admins.every((a) => a.username !== username)) {
            throw new BadRequestException(
                `${username} is not an admin in ${channelName}`,
            );
        }

        // Remove admin
        return await this.prisma.channel.update({
            where: { name: channelName },
            data: {
                members: { connect: { username } },
                admins: { disconnect: { username } },
            },
        });
    }
}
