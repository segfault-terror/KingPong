import { Controller } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('game')
export class GameController {
	constructor(private readonly userService: UserService) {}

	
}

