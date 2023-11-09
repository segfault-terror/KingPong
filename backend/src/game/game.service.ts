import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GameService {
    constructor(private readonly prisma: PrismaService) {}

	async startGame(player1: any, player2: any) {
		console.log('player1', player1);
		console.log('player2', player2);
	}
}
