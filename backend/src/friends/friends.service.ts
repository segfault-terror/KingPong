import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
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

        const dm = await this.prisma.dM.findFirst({
            where: {
                AND: [
                    {
                        OR: [
                            { user1: { username: friendUsername } },
                            { user1: { id: userId } },
                        ],
                    },
                    {
                        OR: [
                            { user2: { username: friendUsername } },
                            { user2: { id: userId } },
                        ],
                    },
                ],
            },
            select: { id: true },
        });

        await this.prisma.message.deleteMany({
            where: { dm_id: dm.id },
        });

        await this.prisma.dM.delete({
            where: { id: dm.id },
        });

        return await this.prisma.user.update({
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

    async getBlockList(userId: string) {
        const BlockList = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                blockedUsers: true,
            },
        });

        const me = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!me) {
            throw new NotFoundException('User not found');
        }

        const blockedUsers = BlockList.blockedUsers.filter(
            (user) => user.id !== me.id,
        );

        return { blockedUsers };
    }
    async blockUser(userId: string, username: string) {
        const user = await this.prisma.user.findUnique({
            where: { username },
        });
        const me = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (me.id === user.id) {
            throw new ForbiddenException('You cannot block yourself');
        }

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return await this.prisma.user.update({
            where: { id: userId },
            data: {
                blockedUsers: {
                    connect: { id: user.id, username: user.username },
                },
            },
        });
    }

    async unblockUser(userId: string, username: string) {
        const user = await this.prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return await this.prisma.user.update({
            where: { id: userId },
            data: {
                blockedUsers: {
                    disconnect: { id: user.id },
                },
                blockedBy: {
                    disconnect: { id: user.id },
                },
            },
        });
    }

    async isUserBlocked(myId: string, username: string) {
        const meUser = await this.prisma.user.findUnique({
            where: { id: myId },
            include: {
                blockedUsers: true,
            },
        });

        if (!meUser) {
            throw new NotFoundException('User not found');
        }

        const blockedUsers = meUser.blockedUsers.filter(
            (user) => user.username === username,
        );

        return blockedUsers.length > 0;
    }

    async isisBlockedByUser(myId: string, username: string) {
        const meUser = await this.prisma.user.findUnique({
            where: { id: myId },
            include: {
                blockedBy: true,
            },
        });

        if (!meUser) {
            throw new NotFoundException('User not found');
        }

        const blockedUsers = meUser.blockedBy.filter(
            (user) => user.username === username,
        );

        return blockedUsers.length > 0;
    }
}
