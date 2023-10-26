import { Module } from '@nestjs/common';
import { UpdateController } from './updateStats.controller';
import { UpdateService } from './updateStats.service';

@Module({
	imports: [],
	controllers: [UpdateController],
    providers: [UpdateService],
    exports: [UpdateService],

})
export class UpdateModule {}
