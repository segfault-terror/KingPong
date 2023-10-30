import {
    BadRequestException,
    ImATeapotException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserService } from 'src/user/user.service';

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

        const result = await this.prisma.dM.findMany({
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
        // HACK: there might be problems with this
        if (result.length > 1)
            throw new Error('There should be only one DM between two users');
        return result[0];
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
                    take: 1,
                },
            },
        });
        return result;
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
}
