import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.user({ username });

        if (!user || !user.password) {
            return null;
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }

        return null;
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

    async getFriends(username: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                username,
            },
            include: {
                friends: true,
                friendOf: true,
            },
        });
        user.friends = [...new Set([...user.friends, ...user.friendOf])];
        delete user.friendOf;
        return user;
    }

    async getMatchHistory(username: string) {
        const user = await this.prisma.user.findUnique({
            where: { username },
            include: {
                gamesAsPlayer1: true,
                gamesAsPlayer2: true,
            },
        });
        const result = {
            ...user,
            games: [
                ...new Set([...user.gamesAsPlayer1, ...user.gamesAsPlayer2]),
            ],
        };
        delete result.gamesAsPlayer1;
        delete result.gamesAsPlayer2;
        return result;
    }
}
