import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MulterModule } from '@nestjs/platform-express';
import { LeaderboardController } from './leaderboard.controller';

@Global()
@Module({
    imports: [
        MulterModule.register({
            dest: './uploads',
        }),
    ],
    controllers: [UserController, LeaderboardController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
