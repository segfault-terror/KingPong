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

        return await this.prisma.directMessage.findMany({
            where: {
                OR: [
                    {
                        sender: { username: username1 },
                        receiver: { username: username2 },
                    },
                    {
                        sender: { username: username2 },
                        receiver: { username: username1 },
                    },
                ],
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
    }
}
