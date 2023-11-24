import { Injectable } from '@nestjs/common';
import { Prisma, Status, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'nestjs-prisma';
import { BufferedFile } from 'src/minio-client/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private minioClientService: MinioClientService,
    ) {}

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async userById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async leaderboard(): Promise<User[]> {
        return this.prisma.user.findMany({
            orderBy: {
                stats: {
                    rank: 'desc',
                },
            },
            include: {
                stats: true,
            },
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
            include: {
                stats: true,
            },
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

    async updateMyData(username: string): Promise<User> {
        const user = await this.prisma.user.update({
            where: {
                username,
            },
            data: {
                newLevelUp: false,
            },
        });
        return user;
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        const res = await this.prisma.user.update({
            data,
            where,
        });
        return res;
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

    async uploadImage(image: BufferedFile) {
        const uploadedImage = await this.minioClientService.upload(image);

        return {
            image_url: uploadedImage.url,
            message: 'Image uploaded successfully',
        };
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
                friends: {
                    orderBy: {
                        status: 'asc',
                    },
                },
                friendOf: {
                    orderBy: {
                        status: 'asc',
                    },
                },
            },
        });

        const friendsMap = new Map();
        user.friends.forEach((friend) => {
            const key = JSON.stringify(friend);
            if (!friendsMap.has(key)) {
                friendsMap.set(key, friend);
            }
        });
        user.friendOf.forEach((friend) => {
            const key = JSON.stringify(friend);
            if (!friendsMap.has(key)) {
                friendsMap.set(key, friend);
            }
        });

        user.friends = [...friendsMap.values()];
        delete user.friendOf;

        user.friends.sort((a, b) => {
            if (a.status === b.status) {
                return 0;
            }
            if (a.status === Status.ONLINE) {
                return -1;
            }
            if (a.status === Status.INGAME) {
                return b.status === Status.ONLINE ? 1 : -1;
            }
            return 1;
        });
        return user;
    }

    async getMatchHistory(username: string) {
        return this.prisma.game.findMany({
            where: {
                OR: [
                    {
                        player1: {
                            username,
                        },
                    },
                    {
                        player2: {
                            username,
                        },
                    },
                ],
            },
            select: {
                id: true,
                player1_score: true,
                player2_score: true,
                player1: {
                    select: {
                        id: true,
                        avatar: true,
                        username: true,
                        stats: {
                            select: {
                                level: true,
                            },
                        },
                    },
                },
                player2: {
                    select: {
                        id: true,
                        avatar: true,
                        username: true,
                        stats: {
                            select: {
                                level: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async isFriend(username: string, friendname: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                username,
            },
            include: {
                friends: {
                    where: {
                        username: friendname,
                    },
                },
                friendOf: {
                    where: {
                        username: friendname,
                    },
                },
            },
        });

        const friend = await this.prisma.user.findFirst({
            where: { username: friendname },
        });

        return {
            friendId: friend.id,
            isFriend: user.friends.length > 0 || user.friendOf.length > 0,
            isMe: username === friendname,
        };
    }
}
