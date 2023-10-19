import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('leaderboard')
export class LeaderboardController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getLeaderboard() {
        return this.userService.leaderboard();
    }
}
