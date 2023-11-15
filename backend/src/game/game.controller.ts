import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { GameService } from './game.service';
import { AuthGard } from 'src/auth/auth.guard';

@Controller('game')
@UseGuards(AuthGard)
export class GameController {
	constructor(private readonly userService: UserService, private readonly gameService: GameService) {}

	@Post('add/match')
	async AddMatch(@Body() body: any) {
		const { player1, player2, ranked, player1_score, player2_score } = body;
		const match = await this.gameService.AddMatch(player1, player2, ranked, player1_score, player2_score);
		return match;
	}

	@Get('get/lastmatch/:username')
	async getLastMatch(@Param('username') username: string) {
		const match = await this.gameService.getLastMatch(username);
		return match;
	}

	@Post('/update')
	async update(@Body() body: any) {
		return this.gameService.updatePlayerScore(body);
	}
}
