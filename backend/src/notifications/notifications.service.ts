import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class NotificationsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.notification.findMany(
            {
                include: {
                    user: true,
                }
            }
        );
    }

    async update(id: string, data: any) {
        return this.prisma.notification.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        return this.prisma.notification.delete({
            where: { id },
        });
    }

    async create(data: any) {

        const notification = await this.prisma.notification.findMany({
            where: {
                senderId: data.senderId,
                userId: data.userId,
            }
        });

        if (!!notification.find((n)=> {
            return n.type === data.type && n.senderId === data.senderId && n.userId === data.userId;
        }))
        return notification;
        return this.prisma.notification.create({
            data: {
                senderId: data.senderId,
                type: data.type,
                user: {
                    connect: {
                        id: data.userId
                    }
                },
            }
        });
    }

}
