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
}
