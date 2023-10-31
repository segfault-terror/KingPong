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
import { UserService } from 'src/user/user.service';

@Controller('friends')
@UseGuards(AuthGard)
export class FriendsController {
    constructor(private readonly friendsService: FriendsService, private readonly userService: UserService) {}

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

        const friend = await this.userService.user({ username: data.username });


        return this.friendsService.addFriend(req.user.id, friend.id);
    }

    @Delete('/remove/:username')
    async removeFriend(@Param('username') username: string, @Req() req: any) {
        return this.friendsService.removeFriend(req.user.id, username);
    }
}
