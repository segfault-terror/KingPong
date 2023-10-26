
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';


@Injectable()
export class UpdateService {
	constructor(
		private readonly prisma: PrismaService,
	) {}

    async userStats(username: string) {
        return this.prisma.user.findUnique({
            where: {
                username,
            },
            include: {
                stats: true,
            },
        });
    }

	async updateUserStats(
        where: Prisma.UserWhereUniqueInput,
        data: Prisma.UserUpdateInput,
    ): Promise<User> {
        return this.prisma.user.update({
            where,
            data,
        });
    }

    async updateUser(
        where: Prisma.UserWhereUniqueInput,
        data: Prisma.UserUpdateInput,
    ): Promise<User> {
        return this.prisma.user.update({
            where,
            data,
        });
    }
}