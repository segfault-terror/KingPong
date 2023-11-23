import { Injectable } from '@nestjs/common';
import { AchievementType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

export type dataAchived = {
    player1: {
        username: string;
        MinTimeRound: number;
        MaxTimeRound: number;
        TimeTouchPaddle: number;
    };
    player2: {
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
            title: string;
            description: string;
            type: AchievementType;
        },
    ) {
        let newData: string;
        console.log('before data: ', data);
        console.log('minRound: ', minRound);
        if (minRound < 20 && data.title === undefined) {
            newData = 'Fast Pong Bronze';
        } else if (minRound < 15 && data.type === AchievementType.BRONZE) {
            newData = 'Fast Pong Silver';
        } else if (minRound < 2 && data.type === AchievementType.SILVER) {
            newData = 'Fast Pong Gold';
        }
        // connect to user
        if (newData) {
            console.log('newData: ', newData);
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
            title: string;
            description: string;
            type: AchievementType;
        },
    ) {
        let newData: string;
        if (score1 - score2 === 1 && data.title === undefined) {
            newData = 'Easy Striker Bronze';
        } else if (
            score1 - score2 === 2 &&
            data.type === AchievementType.BRONZE
        ) {
            newData = 'Easy Striker Silver';
        } else if (
            score1 - score2 === 7 &&
            data.type === AchievementType.SILVER
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
            title: string;
            description: string;
            type: AchievementType;
        },
    ) {
        let newData: string;
        console.log('before data: ', data);
        console.log('maxRound: ', maxRound);
        if (maxRound > 30 && data.title === undefined) {
            newData = 'Long Touch Paddle Bronze';
        } else if (maxRound > 50 && data.type === AchievementType.BRONZE) {
            newData = 'Long Touch Paddle Silver';
        } else if (maxRound > 70 && data.type === AchievementType.SILVER) {
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
            title: string;
            description: string;
            type: AchievementType;
        },
    ) {
        let newData: string;
        console.log('before data: ', data);
        console.log('maxRound: ', maxRound);
        if (maxRound > 30 && data.title === undefined) {
            newData = 'Long Time Round Bronze';
        } else if (maxRound > 20 && data.type === AchievementType.BRONZE) {
            newData = 'Long Time Round Silver';
        } else if (maxRound > 10 && data.type === AchievementType.SILVER) {
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

    async winnerStreak(
        winner: string,
        loser: string,
        data?: {
            user: any;
            title: string;
            description: string;
            type: AchievementType;
        },
    ) {
        let newData: string;
        if (data.title === undefined) {
            newData = 'Winning Streak Bronze';
        } else if (data.type === AchievementType.BRONZE) {
            newData = 'Winning Streak Silver';
        } else if (data.type === AchievementType.SILVER) {
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

    async cleanSheet(
        winner: string,
        data?: {
            user: any;
            title: string;
            description: string;
            type: AchievementType;
        },
    ) {
        let newData: string;
        if (data.title === undefined) {
            newData = 'Clean Sheet Bronze';
        } else if (data.type === AchievementType.BRONZE) {
            newData = 'Clean Sheet Silver';
        } else if (data.type === AchievementType.SILVER) {
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
            title: string;
            description: string;
            type: AchievementType;
        },
    ) {
        let newData: string;
        console.log('before data: ', data);
        console.log('user: ', user);
        if (data.title === undefined) {
            newData = 'Best of all Bronze';
        } else if (data.type === AchievementType.BRONZE) {
            newData = 'Best of all Silver';
        } else if (data.type === AchievementType.SILVER) {
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
            ...achievementsUser1.find((ach) => {
                return (
                    ach.title === 'Fast Pong Bronze' ||
                    ach.title === 'Fast Pong Silver' ||
                    ach.title === 'Fast Pong Gold'
                );
            }),
        });
        this.fastRound(data.player2.MinTimeRound, {
            user: user2,
            ...achievementsUser2.find((ach) => {
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
            ...achievementsUser1.find((ach) => {
                return (
                    ach.title === 'Easy Striker Bronze' ||
                    ach.title === 'Easy Striker Silver' ||
                    ach.title === 'Easy Striker Gold'
                );
            }),
        });

        this.easyStriker(data.player2.score, data.player1.score, {
            user: user2,
            ...achievementsUser2.find((ach) => {
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
            ...achievementsUser1.find((ach) => {
                return (
                    ach.title === 'Long Touch Paddle Bronze' ||
                    ach.title === 'Long Touch Paddle Silver' ||
                    ach.title === 'Long Touch Paddle Gold'
                );
            }),
        });

        this.longTouchPaddle(data.player2.TimeTouchPaddle, {
            user: user2,
            ...achievementsUser2.find((ach) => {
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
            ...achievementsUser1.find((ach) => {
                return (
                    ach.title === 'Long Time Round Bronze' ||
                    ach.title === 'Long Time Round Silver' ||
                    ach.title === 'Long Time Round Gold'
                );
            }),
        });

        this.longTimeRound(data.player2.MaxTimeRound, {
            user: user2,
            ...achievementsUser2.find((ach) => {
                return (
                    ach.title === 'Long Time Round Bronze' ||
                    ach.title === 'Long Time Round Silver' ||
                    ach.title === 'Long Time Round Gold'
                );
            }),
        });

        // WinnerStreak
        if (data.player1.score > data.player2.score)
            this.winnerStreak(data.player1.username, data.player2.username, {
                user: user1,
                ...achievementsUser1.find((ach) => {
                    return (
                        ach.title === 'Winner Streak Bronze' ||
                        ach.title === 'Winner Streak Silver' ||
                        ach.title === 'Winner Streak Gold'
                    );
                }),
            });
        else
            this.winnerStreak(data.player2.username, data.player1.username, {
                user: user2,
                ...achievementsUser2.find((ach) => {
                    return (
                        ach.title === 'Winner Streak Bronze' ||
                        ach.title === 'Winner Streak Silver' ||
                        ach.title === 'Winner Streak Gold'
                    );
                }),
            });

        // Clean Sheet
        if (data.player1.score === 0)
            this.cleanSheet(data.player2.username, {
                user: user2,
                ...achievementsUser2.find((ach) => {
                    return (
                        ach.title === 'Clean Sheet Bronze' ||
                        ach.title === 'Clean Sheet Silver' ||
                        ach.title === 'Clean Sheet Gold'
                    );
                }),
            });
        else if (data.player2.score === 0)
            this.cleanSheet(data.player1.username, {
                user: user1,
                ...achievementsUser1.find((ach) => {
                    return (
                        ach.title === 'Clean Sheet Bronze' ||
                        ach.title === 'Clean Sheet Silver' ||
                        ach.title === 'Clean Sheet Gold'
                    );
                }),
            });

        // Best of all
        if (
            achievementsUser1.length === 6 ||
            achievementsUser1.length === 13 ||
            achievementsUser1.length === 20
        )
            this.bestOfAll(user1, {
                user: user1,
                ...achievementsUser1.find((ach) => {
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
                ...achievementsUser2.find((ach) => {
                    return (
                        ach.title === 'Best of all Bronze' ||
                        ach.title === 'Best of all Silver' ||
                        ach.title === 'Best of all Gold'
                    );
                }),
            });
    }
}
