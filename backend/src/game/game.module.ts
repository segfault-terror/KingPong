import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { ComputerService } from './computer/computer.service';
import { RankedService } from './ranked/ranked.service';
import { AchievementsService } from 'src/achievements/achievements.service';

@Module({
    providers: [
        GameService,
        GameGateway,
        ComputerService,
        RankedService,
        AchievementsService,
    ],
    controllers: [GameController],
})
export class GameModule {}
