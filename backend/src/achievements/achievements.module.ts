import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';

@Module({
    imports: [],
    controllers: [AchievementsController],
    providers: [AchievementsService],
    exports: [],
})
export class AchievementsModule {}
