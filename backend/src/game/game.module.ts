import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { ComputerService } from './computer/computer.service';
import { RankedService } from './ranked/ranked.service';

@Module({
    providers: [GameService, GameGateway, ComputerService, RankedService],
    controllers: [GameController],
})
export class GameModule {}
