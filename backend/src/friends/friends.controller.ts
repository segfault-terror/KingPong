import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGard } from '../auth/auth.guard';
import { FriendsService } from './friends.service';

@Controller('friends')
@UseGuards(AuthGard)
export class FriendsController {
    userService: any;
    constructor(private readonly friendsService: FriendsService) {}

    @Get('/get/:username/friends')
    async getUserFriends(@Param('username') username: string) {
        const user = await this.userService.getFriends(username);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        delete user.password;
        return user;
    }

    @Post('/add')
    async addFriend(@Body() data: any, @Req() req: any) {
        return this.friendsService.addFriend(req.user.id, data.senderId);
    }

    @Delete('/remove/:username')
    async removeFriend(@Param('username') username: string, @Req() req: any) {
        return this.friendsService.removeFriend(req.user.id, username);
    }
}
