import { Controller, Get, UseGuards } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AuthGard } from '../auth/auth.guard';

@Controller('achievements')
export class AchievementsController {
    constructor(private readonly achievementsService: AchievementsService) {}

    @Get()
    @UseGuards(AuthGard)
    async getAll() {
        return this.achievementsService.getAll();
    }
}
