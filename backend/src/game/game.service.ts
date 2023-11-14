import { Get, Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

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
}
