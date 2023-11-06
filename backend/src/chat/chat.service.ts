import {
    BadRequestException,
    ImATeapotException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { ChannelType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChatService {
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

        return filteredResult;
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
            console.log('creating new dm');
            dm = await this.prisma.dM.create({
                data: {
                    user1: { connect: { id: sender.id } },
                    user2: { connect: { id: receiver.id } },
                },
            });
            console.log('created dm');
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
        return this.prisma.channel.findMany({
            where: {
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
        });
    }

    async getChannel(channelName: string) {
        const channel = await this.prisma.channel.findFirst({
            where: { name: channelName },
            select: {
                name: true,
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
                        avatar: true,
                        status: true,
                    },
                },
                admins: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                        status: true,
                    },
                },
                members: {
                    select: {
                        id: true,
                        username: true,
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
        console.log(
            `channelName: ${channelName}, username: ${username}, password: ${password}`,
        );

        const channel = await this.prisma.channel.findFirst({
            where: {
                name: channelName,
                members: {
                    none: { username },
                },
            },
            select: {
                password: true,
                type: true,
                members: true,
            },
        });

        if (!channel) {
            throw new NotFoundException(
                `Channel ${channelName} not found or you are already in it`,
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

            console.log(
                `[chat] Joining ${channelName} with password ${password}`,
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
                owner: { connect: { id: owner.id } },
            },
        });
    }
}
