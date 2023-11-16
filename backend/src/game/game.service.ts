import { Body, Get, Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { getExpectedScore, getKFactor, getNewRating } from '../utils/elo';
import { getExpToLevelUp } from 'src/utils/levelUp';

@Injectable()
export class GameService {
    constructor(private readonly prisma: PrismaService) {}

    async AddMatch(
        player1: string,
        player2: string,
        ranked: boolean,
        player1_score: number,
        player2_score: number,
    ) {
        const user1 = await this.prisma.user.findUnique({
            where: {
                username: player1,
            },
        });
        const user2 = await this.prisma.user.findUnique({
            where: {
                username: player2,
            },
        });
        if (!user1 || !user2) {
            return null;
        }
        const match = await this.prisma.game.create({
            data: {
                player1: {
                    connect: {
                        id: user1.id,
                    },
                },
                player2: {
                    connect: {
                        id: user2.id,
                    },
                },
                ranked: ranked,
                player1_score: player1_score,
                player2_score: player2_score,
            },
        });
        return match;
    }

    async getLastMatch(@Param('username') username: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!user) {
            return null;
        }

        const match = await this.prisma.game.findFirst({
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
            orderBy: {
                createdAt: 'desc',
            },
        });
        return match;
    }

    async updatePlayerScore(@Body() data: any) {
        const user1 = await this.prisma.user.findUnique({
            where: {
                username: data.player1,
            },
            include: {
                stats: true,
            },
        });
        const user2 = await this.prisma.user.findUnique({
            where: {
                username: data.player2,
            },
            include: {
                stats: true,
            },
        });

        if (!user1 || !user2) {
            return null;
        }
        const elo1 = getNewRating(
            user1.stats.rank,
            getExpectedScore(user1.stats.rank, user2.stats.rank),
            data.player1_score,
            getKFactor(user1.stats.league),
        );
        const elo2 = getNewRating(
            user2.stats.rank,
            getExpectedScore(user2.stats.rank, user1.stats.rank),
            data.player2_score,
            getKFactor(user2.stats.league),
        );

        const league1 =
            elo1 >= 2000 ? 'GOLD' : elo1 >= 1000 ? 'SILVER' : 'BRONZE';
        const league2 =
            elo2 >= 2000 ? 'GOLD' : elo2 >= 1000 ? 'SILVER' : 'BRONZE';

        const levelPlayer1: { level: number; XP: number; nextLevelXP: number } =
            getExpToLevelUp(
                user1.stats.NextLevelXP,
                user1.stats.level,
                user1.stats.XP,
                data.player1_score,
                data.player2_score,
            );
        const levelPlayer2: { level: number; XP: number; nextLevelXP: number } =
            getExpToLevelUp(
                user2.stats.NextLevelXP,
                user2.stats.level,
                user2.stats.XP,
                data.player2_score,
                data.player1_score,
            );

        const updatedUser1 = await this.prisma.user.update({
            where: {
                id: user1.id,
            },
            data: {
                stats: {
                    update: {
                        rank: elo1,
                        league: league1,
                        level: levelPlayer1.level,
                        XP: levelPlayer1.XP,
                        NextLevelXP: levelPlayer1.nextLevelXP,
                    },
                },
            },
        });

        const updatedUser2 = await this.prisma.user.update({
            where: {
                id: user2.id,
            },
            data: {
                stats: {
                    update: {
                        rank: elo2,
                        league: league2,
                        level: levelPlayer2.level,
                        XP: levelPlayer2.XP,
                        NextLevelXP: levelPlayer2.nextLevelXP,
                    },
                },
            },
        });

        return {
            user1: updatedUser1,
            user2: updatedUser2,
        };
    }
}
