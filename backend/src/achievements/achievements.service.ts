import { Injectable } from '@nestjs/common';
import { AchievementType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

export type dataAchived = {
    player1: {
        score: number;
        username: string;
        MinTimeRound: number;
        MaxTimeRound: number;
        TimeTouchPaddle: number;
    };
    player2: {
        score: number;
        username: string;
        MinTimeRound: number;
        MaxTimeRound: number;
        TimeTouchPaddle: number;
    };
};
@Injectable()
export class AchievementsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.achievement.findMany();
    }

    async fastRound(
        minRound: number,
        data?: {
            user: any;
            achievements: { type: AchievementType; title: string }[];
        },
    ) {
        let newData: string;
        if (minRound < 20 && data.achievements.length === 0) {
            newData = 'Fast Pong Bronze';
        } else if (
            minRound < 15 &&
            data.achievements.find((ach) => ach.type === AchievementType.BRONZE)
        ) {
            newData = 'Fast Pong Silver';
        } else if (
            minRound < 2 &&
            data.achievements.find((ach) => ach.type === AchievementType.SILVER)
        ) {
            newData = 'Fast Pong Gold';
        }
        // connect to user
        if (newData) {
            return this.prisma.achievement.update({
                where: { title: newData },
                data: {
                    users: {
                        connect: {
                            id: data.user.id,
                        },
                    },
                },
            });
        }
    }

    async easyStriker(
        score1: number,
        score2: number,
        data?: {
            user: any;
            achievements: { type: AchievementType; title: string }[];
        },
    ) {
        let newData: string;
        if (score1 - score2 === 1 && data.achievements.length === 0) {
            newData = 'Easy Striker Bronze';
        } else if (
            score1 - score2 === 2 &&
            data.achievements.find((ach) => ach.type === AchievementType.BRONZE)
        ) {
            newData = 'Easy Striker Silver';
        } else if (
            score1 - score2 === 7 &&
            data.achievements.find((ach) => ach.type === AchievementType.SILVER)
        ) {
            newData = 'Easy Striker Gold';
        }
        // connect to user
        if (newData) {
            return this.prisma.achievement.update({
                where: { title: newData },
                data: {
                    users: {
                        connect: {
                            id: data.user.id,
                        },
                    },
                },
            });
        }
    }

    async longTouchPaddle(
        maxRound: number,
        data?: {
            user: any;
            achievements: { type: AchievementType; title: string }[];
        },
    ) {
        let newData: string;
        if (maxRound > 30 && data.achievements.length === 0) {
            newData = 'Long Touch Paddle Bronze';
        } else if (
            maxRound > 50 &&
            data.achievements.find((ach) => ach.type === AchievementType.BRONZE)
        ) {
            newData = 'Long Touch Paddle Silver';
        } else if (
            maxRound > 70 &&
            data.achievements.find((ach) => ach.type === AchievementType.SILVER)
        ) {
            newData = 'Long Touch Paddle Gold';
        }
        // connect to user
        if (newData) {
            return this.prisma.achievement.update({
                where: { title: newData },
                data: {
                    users: {
                        connect: {
                            id: data.user.id,
                        },
                    },
                },
            });
        }
    }

    async longTimeRound(
        maxRound: number,
        data?: {
            user: any;
            achievements: { type: AchievementType; title: string }[];
        },
    ) {
        let newData: string;
        if (maxRound > 30 && data.achievements.length === 0) {
            newData = 'Long Time Round Bronze';
        } else if (
            maxRound > 20 &&
            data.achievements.find((ach) => ach.type === AchievementType.BRONZE)
        ) {
            newData = 'Long Time Round Silver';
        } else if (
            maxRound > 10 &&
            data.achievements.find((ach) => ach.type === AchievementType.SILVER)
        ) {
            newData = 'Long Time Round Gold';
        }
        // connect to user
        if (newData) {
            return this.prisma.achievement.update({
                where: { title: newData },
                data: {
                    users: {
                        connect: {
                            id: data.user.id,
                        },
                    },
                },
            });
        }
    }

    async winnerStreak(data?: {
        user: any;
        achievements: { type: AchievementType; title: string }[];
    }) {
        console.log('username: ', data.user.username);
        console.log('user streak: ', data.user.stats.winnerStreak);
        let newData: string;
        if (
            data.achievements.length === 0 &&
            data.user.stats.winnerStreak === 3
        ) {
            newData = 'Winning Streak Bronze';
        } else if (
            data.achievements.find(
                (ach) => ach.type === AchievementType.BRONZE,
            ) &&
            data.user.stats.winnerStreak === 5
        ) {
            newData = 'Winning Streak Silver';
        } else if (
            data.achievements.find(
                (ach) => ach.type === AchievementType.SILVER,
            ) &&
            data.user.stats.winnerStreak === 10
        ) {
            newData = 'Winning Streak Gold';
        }
        // connect to user
        if (newData) {
            return this.prisma.achievement.update({
                where: { title: newData },
                data: {
                    users: {
                        connect: {
                            id: data.user.id,
                        },
                    },
                },
            });
        }
    }

    async cleanSheet(data?: {
        user: any;
        achievements: { type: AchievementType; title: string }[];
    }) {
        console.log('username: ', data.user.username);
        console.log('user cleanSheet: ', data.user.stats.cleanSheets);
        let newData: string;
        if (
            data.achievements.length === 0 &&
            data.user.stats.cleanSheets === 3
        ) {
            newData = 'Clean Sheet Bronze';
        } else if (
            data.achievements.find(
                (ach) =>
                    ach.type === AchievementType.BRONZE &&
                    data.user.stats.cleanSheets === 5,
            )
        ) {
            newData = 'Clean Sheet Silver';
        } else if (
            data.achievements.find(
                (ach) =>
                    ach.type === AchievementType.SILVER &&
                    data.user.stats.cleanSheets === 10,
            )
        ) {
            newData = 'Clean Sheet Gold';
        }
        // connect to user
        if (newData) {
            return this.prisma.achievement.update({
                where: { title: newData },
                data: {
                    users: {
                        connect: {
                            id: data.user.id,
                        },
                    },
                },
            });
        }
    }

    async bestOfAll(
        user: any,
        data?: {
            user: any;
            achievements: { type: AchievementType; title: string }[];
        },
    ) {
        let newData: string;
        if (data.achievements.length === 0) {
            newData = 'Best of all Bronze';
        } else if (
            data.achievements.find((ach) => ach.type === AchievementType.BRONZE)
        ) {
            newData = 'Best of all Silver';
        } else if (
            data.achievements.find((ach) => ach.type === AchievementType.SILVER)
        ) {
            newData = 'Best of all Gold';
        }
        // connect to user
        if (newData) {
            return this.prisma.achievement.update({
                where: { title: newData },
                data: {
                    users: {
                        connect: {
                            id: data.user.id,
                        },
                    },
                },
            });
        }
    }

    async GenerateAchievements(data: any) {
        const { player1, player2 } = data;
        console.log('data: ', data);
        const user1 = await this.prisma.user.findUnique({
            where: { username: player1.username },
            include: {
                stats: true,
                achievements: true,
            },
        });
        const user2 = await this.prisma.user.findUnique({
            where: { username: player2.username },
            include: {
                stats: true,
                achievements: true,
            },
        });

        const achievementsUser1 = user1.achievements;
        const achievementsUser2 = user2.achievements;

        // Fast Round
        this.fastRound(data.player1.MinTimeRound, {
            user: user1,
            achievements: achievementsUser1.filter((ach) => {
                return (
                    ach.title === 'Fast Pong Bronze' ||
                    ach.title === 'Fast Pong Silver' ||
                    ach.title === 'Fast Pong Gold'
                );
            }),
        });

        this.fastRound(data.player2.MinTimeRound, {
            user: user2,
            achievements: achievementsUser2.filter((ach) => {
                return (
                    ach.title === 'Fast Pong Bronze' ||
                    ach.title === 'Fast Pong Silver' ||
                    ach.title === 'Fast Pong Gold'
                );
            }),
        });

        // Easy Striker
        this.easyStriker(data.player1.score, data.player2.score, {
            user: user1,
            achievements: achievementsUser1.filter((ach) => {
                return (
                    ach.title === 'Easy Striker Bronze' ||
                    ach.title === 'Easy Striker Silver' ||
                    ach.title === 'Easy Striker Gold'
                );
            }),
        });

        this.easyStriker(data.player2.score, data.player1.score, {
            user: user2,
            achievements: achievementsUser2.filter((ach) => {
                return (
                    ach.title === 'Easy Striker Bronze' ||
                    ach.title === 'Easy Striker Silver' ||
                    ach.title === 'Easy Striker Gold'
                );
            }),
        });

        // Long Touch Paddle
        this.longTouchPaddle(data.player1.TimeTouchPaddle, {
            user: user1,
            achievements: achievementsUser1.filter((ach) => {
                return (
                    ach.title === 'Long Touch Paddle Bronze' ||
                    ach.title === 'Long Touch Paddle Silver' ||
                    ach.title === 'Long Touch Paddle Gold'
                );
            }),
        });

        this.longTouchPaddle(data.player2.TimeTouchPaddle, {
            user: user2,
            achievements: achievementsUser2.filter((ach) => {
                return (
                    ach.title === 'Long Touch Paddle Bronze' ||
                    ach.title === 'Long Touch Paddle Silver' ||
                    ach.title === 'Long Touch Paddle Gold'
                );
            }),
        });

        // Long Time Round

        this.longTimeRound(data.player1.MaxTimeRound, {
            user: user1,
            achievements: achievementsUser1.filter((ach) => {
                return (
                    ach.title === 'Long Time Round Bronze' ||
                    ach.title === 'Long Time Round Silver' ||
                    ach.title === 'Long Time Round Gold'
                );
            }),
        });

        this.longTimeRound(data.player2.MaxTimeRound, {
            user: user2,
            achievements: achievementsUser2.filter((ach) => {
                return (
                    ach.title === 'Long Time Round Bronze' ||
                    ach.title === 'Long Time Round Silver' ||
                    ach.title === 'Long Time Round Gold'
                );
            }),
        });

        // WinnerStreak
        if (data.player1.score > data.player2.score) {
            this.winnerStreak({
                user: user1,
                achievements: achievementsUser1.filter((ach) => {
                    return (
                        ach.title === 'Winner Streak Bronze' ||
                        ach.title === 'Winner Streak Silver' ||
                        ach.title === 'Winner Streak Gold'
                    );
                }),
            });
        } else {
            this.winnerStreak({
                user: user2,
                achievements: achievementsUser2.filter((ach) => {
                    return (
                        ach.title === 'Winner Streak Bronze' ||
                        ach.title === 'Winner Streak Silver' ||
                        ach.title === 'Winner Streak Gold'
                    );
                }),
            });
        }

        // Clean Sheet
        if (data.player1.score === 0) {
            console.log('player 2 cleanSheet');
            this.cleanSheet({
                user: user2,
                achievements: achievementsUser2.filter((ach) => {
                    return (
                        ach.title === 'Clean Sheet Bronze' ||
                        ach.title === 'Clean Sheet Silver' ||
                        ach.title === 'Clean Sheet Gold'
                    );
                }),
            });
        } else if (data.player2.score === 0) {
            console.log('player 1 cleanSheet');
            this.cleanSheet({
                user: user1,
                achievements: achievementsUser1.filter((ach) => {
                    return (
                        ach.title === 'Clean Sheet Bronze' ||
                        ach.title === 'Clean Sheet Silver' ||
                        ach.title === 'Clean Sheet Gold'
                    );
                }),
            });
        }

        // Best of all
        if (
            achievementsUser1.length === 6 ||
            achievementsUser1.length === 13 ||
            achievementsUser1.length === 20
        )
            this.bestOfAll(user1, {
                user: user1,
                achievements: achievementsUser1.filter((ach) => {
                    return (
                        ach.title === 'Best of all Bronze' ||
                        ach.title === 'Best of all Silver' ||
                        ach.title === 'Best of all Gold'
                    );
                }),
            });
        if (
            achievementsUser2.length === 6 ||
            achievementsUser2.length === 13 ||
            achievementsUser2.length === 20
        )
            this.bestOfAll(user2, {
                user: user2,
                achievements: achievementsUser2.filter((ach) => {
                    return (
                        ach.title === 'Best of all Bronze' ||
                        ach.title === 'Best of all Silver' ||
                        ach.title === 'Best of all Gold'
                    );
                }),
            });
    }
}
