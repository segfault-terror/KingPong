import { AchievementType, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
   
    await prisma.achievement.createMany({
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

    const users = [
        {
            fullname: 'Hamza Haddani',
            username: 'Hamza',
            email: 'h@g.com',
            password: await bcrypt.hash('hamzahamza', 10),
            avatar: 'https://cdn.intra.42.fr/users/40ff48680a112910914c132211cbc9a3/hhamza.jpg',
            stats: {
                wins: 0,
                losses: 0,
                rank: 1000,
                league: 'BRONZE',
            },
        },
        {
            fullname: 'Aymane Aggoujjil',
            username: 'Aymane',
            email: 'a@g.com',
            password: await bcrypt.hash('aymaneaymane', 10),
            avatar: 'https://cdn.intra.42.fr/users/90acb3217b4be8350fa9f9fc32dd2200/aaggoujj.jpg',
        },
        {
            fullname: 'Moussa Seddik',
            username: 'Moussa',
            email: 'm@g.com',
            password: await bcrypt.hash('moussamoussa', 10),
            avatar: 'https://cdn.intra.42.fr/users/811c6da3283271dcc1794c667938159c/moseddik.jpg',
        },
        {
            fullname: 'Omar Aizab',
            username: 'Omar',
            email: 'o@g.com',
            password: await bcrypt.hash('omaromar', 10),
            avatar: 'https://cdn.intra.42.fr/users/10ebb5a3e3bf8fdf210566bfe0a102e0/oaizab.jpg',
        },
    ];

    users.forEach(async (user) => {
        await prisma.user.create({
            data: {
                ...user,
                stats: {
                    create: {
                        wins: 0,
                        losses: 0,
                        rank: 1000,
                        league: 'BRONZE',
                    },
                },
            },
        });
    });
}

seed();
prisma.$disconnect();
