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
        return this.prisma.notification.create({
            data: {
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
