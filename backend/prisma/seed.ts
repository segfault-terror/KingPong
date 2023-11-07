import { AchievementType, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

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
