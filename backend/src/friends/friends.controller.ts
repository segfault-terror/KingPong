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
    constructor(
        private readonly friendsService: FriendsService,
        private readonly userService: UserService,
    ) {}

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

    @Get('/get/blockList')
    async getBlockList(@Req() req: any) {
        return this.friendsService.getBlockList(req.user.id);
    }

    @Post('/block/:username')
    async blockUser(@Param('username') username: string, @Req() req: any) {
        // remove friends relationship
        await this.friendsService.removeFriend(req.user.id, username);
        return this.friendsService.blockUser(req.user.id, username);
    }

    @Post('/unblock/:username')
    async unblockUser(@Param('username') username: string, @Req() req: any) {
        return this.friendsService.unblockUser(req.user.id, username);
    }

    @Get('/isBlocked/:username')
    async isBlocked(@Param('username') username: string, @Req() req: any) {
        return this.friendsService.isUserBlocked(req.user.id, username);
    }

    @Get('/isBlockedBy/:username')
    async isBlockedBy(@Param('username') username: string, @Req() req: any) {
        return this.friendsService.isisBlockedByUser(req.user.id, username);
    }
}
