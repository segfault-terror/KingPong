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
}
