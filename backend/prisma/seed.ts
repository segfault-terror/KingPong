import { AchievementType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    await prisma.achievement.createMany({
        skipDuplicates: true,
        data: [
            {
                title: 'Fast Pong Bronze',
                description: 'Win a round in less than 20 seconds',
                type: AchievementType.BRONZE,
            },
            {
                title: 'Fast Pong Silver',
                description: 'Win a round in less than 15 seconds',
                type: AchievementType.SILVER,
            },
            {
                title: 'Fast Pong Gold',
                description: 'Win a round in less than 7 seconds',
                type: AchievementType.GOLD,
            },
            {
                title: 'Easy Striker Bronze',
                description: 'Win a Match with 1 goals difference',
                type: AchievementType.BRONZE,
            },
            {
                title: 'Easy Striker Silver',
                description: 'Win a Match with 2 goals difference',
                type: AchievementType.SILVER,
            },
            {
                title: 'Easy Striker Gold',
                description: 'Win a Match with 7 goals difference',
                type: AchievementType.GOLD,
            },
            {
                title: 'Long Touch Paddle Bronze',
                description: 'Win a Match with 30 touches',
                type: AchievementType.BRONZE,
            },
            {
                title: 'Long Touch Paddle Silver',
                description: 'Win a Match with 50 touches',
                type: AchievementType.SILVER,
            },
            {
                title: 'Long Touch Paddle Gold',
                description: 'Win a Match with 70 touches',
                type: AchievementType.GOLD,
            },
            {
                title: 'Long Time Round Bronze',
                description: 'Scored a goal after 30 seconds',
                type: AchievementType.BRONZE,
            },
            {
                title: 'Long Time Round Silver',
                description: 'Scored a goal after 20 seconds',
                type: AchievementType.SILVER,
            },
            {
                title: 'Long Time Round Gold',
                description: 'Scored a goal after 10 seconds',
                type: AchievementType.GOLD,
            },
            {
                title: 'Winning Streak Bronze',
                description: 'Win 3 matches in a row',
                type: AchievementType.BRONZE,
            },
            {
                title: 'Winning Streak Silver',
                description: 'Win 5 matches in a row',
                type: AchievementType.SILVER,
            },
            {
                title: 'Winning Streak Gold',
                description: 'Win 10 matches in a row',
                type: AchievementType.GOLD,
            },
            {
                title: 'Clean Sheet Bronze',
                description: 'Win a match without conceding a goal',
                type: AchievementType.BRONZE,
            },
            {
                title: 'Clean Sheet Silver',
                description: 'Win 3 matches without conceding a goal',
                type: AchievementType.SILVER,
            },
            {
                title: 'Clean Sheet Gold',
                description: 'Win 5 matches without conceding a goal',
                type: AchievementType.GOLD,
            },
            {
                title: 'Best of all Bronze',
                description: 'Won all achievements bronze',
                type: AchievementType.BRONZE,
            },
            {
                title: 'Best of all Silver',
                description: 'Won all achievements silver',
                type: AchievementType.SILVER,
            },
            {
                title: 'Best of all Gold',
                description: 'Won all achievements gold',
                type: AchievementType.GOLD,
            },
        ],
    });
}

seed();
prisma.$disconnect();
