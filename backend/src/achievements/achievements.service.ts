import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AchievementsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.achievement.findMany();
    }
}
