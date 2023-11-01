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

        // await this.prisma.message.deleteMany({
        //     where: {
        //         dm_id: dmId,
        //     },
        // });
        // await this.prisma.dM.delete({
        //     where: {
        //         id: dmId,
        //     },
        // });
    }
}
