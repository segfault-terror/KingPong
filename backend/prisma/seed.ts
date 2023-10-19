import { AchievementType, NotifType, PrismaClient } from '@prisma/client';

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

    const user = await prisma.user.create({
        data: {
            username: 'aaggoujj',
            email: '',
            password: '',
            avatar: 'https://cdn.intra.42.fr/users/90acb3217b4be8350fa9f9fc32dd2200/aaggoujj.jpg',
            fullname: 'Full Name',
            stats:{
                create: {
                    wins: 0,
                    losses: 0,
                    rank: 1000,
                    league: 'BRONZE'
                }
            }
        },
    });
    await prisma.notification.createMany({
        data: [
            {
                readed: false,
                type: NotifType.GAME,
                userId: user.id,
            },
        ],
    });
}

seed();
prisma.$disconnect();
