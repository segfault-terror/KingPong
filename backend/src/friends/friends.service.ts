import { Injectable } from '@nestjs/common';
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
}
