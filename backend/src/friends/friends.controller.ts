import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGard } from '../auth/auth.guard';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
	userService: any;
	constructor(private readonly FriendsService: FriendsService) {}

	@Get('/get/:username/friends')
    @UseGuards(AuthGard)
    async getUserFriends(@Param('username') username: string) {
        const user = await this.userService.getFriends(username);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        delete user.password;
        return user;
    }

	@Post('/add')
	@UseGuards(AuthGard)
	async addFriend(@Body() data: any, @Req() req: any) {
		return this.FriendsService.addFriend(req.user.id, data.senderId);
	}
}