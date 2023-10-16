import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data: {
                ...data,
                stats: {
                    create: {},
                },
                achievements: {
                    create: [],
                },
            },
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }

    async searchUsers(search: string): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        fullname: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });
    }

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

    async userAchievements(username: string) {
        return this.prisma.user.findUnique({
            where: {
                username,
            },
            include: {
                achievements: true,
            },
        });
    }
}
