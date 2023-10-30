import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class FriendsService {
    constructor(private readonly prisma: PrismaService) {}

    async addFriend(id: string, friendId: string) {
        return await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                friends: {
                    connect: {
                        id: friendId,
                    },
                },
            },
        });
    }

    async removeFriend(userId: string, friendUsername: string) {
        const friend = await this.prisma.user.findUnique({
            where: { username: friendUsername },
        });

        if (!friend) {
            throw new NotFoundException('User not found');
        }

        await this.prisma.user.update({
            where: { id: userId },
            data: {
                friends: {
                    disconnect: { id: friend.id },
                },
                friendOf: {
                    disconnect: { id: friend.id },
                },
            },
        });
    }
}
