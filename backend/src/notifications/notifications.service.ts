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
        return  await this.prisma.notification.findMany({
            where: {
                sendToId: id,
            },
            include: {
                user: true,
            },
        });
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
        return await this.prisma.notification.deleteMany({
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
            select:{
                Notifications: true,
                username: true,
            }
        });

        if (!me) {
            throw new NotFoundException('User not found');
        }

        if (me.Notifications.some((notification) => notification.sendToId === data.sendToId && notification.type === data.type)) {
            throw new NotFoundException('Notification already exists');
        }
        const newNotif = await this.prisma.notification.create({
            data: {
                sendToId: data.sendToId,
                type: data.type,
                user: {
                    connect: {
                        id: data.userId,
                    },
                },
            },
        });

        newNotif.userId = data.userId;
        return newNotif;
    }

    async notificationNotRead(id: string) {
        return await this.prisma.notification.findMany({
            where: {
                sendToId: id,
                readed: false,
            },
        });
    }
}
