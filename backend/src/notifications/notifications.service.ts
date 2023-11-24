import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class NotificationsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.notification.findMany({
            include: {
                user: true,
            },
        });
    }

    async getmyAll(id: string) {
        const notification = await this.prisma.notification.findMany({
            where: {
                sendToId: id,
            },
            include: {
                user: true,
            },
        });
        console.log(notification);
        return notification;
    }

    async update(id: string, data: any) {
        return this.prisma.notification.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        return this.prisma.notification.delete({
            where: {
                id,
            },
        });
    }

    async deleteAll(id: string) {
        return this.prisma.notification.deleteMany({
            where: {
                sendToId: id,
            },
        });
    }

    async create(data: any) {
        const me = await this.prisma.user.findUnique({
            where: {
                id: data.userId,
            },
            select: {
                Notifications: true,
                username: true,
            },
        });

        if (!me) {
            throw new NotFoundException('User not found');
        }

        if (
            me.Notifications.some(
                (notification) =>
                    notification.sendToId === data.sendToId &&
                    notification.type === data.type,
            )
        ) {
            return;
        }
        const ChallengeId = data.type === 'GAME' ? data.ChallengeId : '';

        return this.prisma.notification.create({
            data: {
                sendToId: data.sendToId,
                type: data.type,
                ChallengeId: ChallengeId,
                user: {
                    connect: {
                        id: data.userId,
                    },
                },
            },
        });
    }

    async notificationNotRead(id: string) {
        return this.prisma.notification.findMany({
            where: {
                sendToId: id,
                readed: false,
            },
        });
    }

    async notificationExist(id: string, data: any) {
        const notif = await this.prisma.notification.findMany({
            where: {
                sendToId: id,
            },
        });
        if (notif.length == 0) {
            return false;
        }

        return notif.some(
            (notification) =>
                notification.userId === data.userId &&
                notification.type === data.type,
        );
    }

    async getUserByUsername(username: string) {
        return await this.prisma.user.findUnique({
            where: {
                username,
            },
        });
    }
}
