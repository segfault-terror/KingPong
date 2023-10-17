import { AchievementType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    await prisma.achievement.createMany({
        data: [
            {
                title: 'Pong Pro',
                description: 'Win 10 game of pong',
                type: AchievementType.BRONZE,
            },
            {
                title: 'Pong Veteran',
                description: 'Win 50 games of pong',
                type: AchievementType.SILVER,
            },
            {
                title: 'Pong King',
                description: 'Win 100 games of pong',
                type: AchievementType.GOLD,
            },
        ],
        skipDuplicates: true,
    });
}

seed();
prisma.$disconnect();
