import {
    Controller,
    Get,
    Post,
    Req,
    Body,
    ConflictException,
    UsePipes,
    ValidationPipe,
    Param,
    UseGuards,
    NotFoundException,
    Query,
    UseInterceptors,
    UploadedFile,
    Header,
    Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './utils/create.user.dto';
import { AuthGard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './utils/update.user.dto';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('user')
// @Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('me')
    @UseGuards(AuthGard)
    async me(@Req() req: any) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = req.user;
        return user;
    }

    @Get('get/:username')
    @UseGuards(AuthGard)
    async user(@Param('username') username: string) {
        const userByUsername = await this.userService.user({ username });
        if (!userByUsername) {
            throw new NotFoundException('User not found');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = userByUsername;
        return user;
    }

    @Get('search')
    @UseGuards(AuthGard)
    async search(@Query('q') q: string) {
        return this.userService.searchUsers(q);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() body: CreateUserDto) {
        body.avatar = 'https://robohash.org/' + body.username + '?set=set3';
        const userByUsername = await this.userService.user({
            username: body.username,
        });
        if (userByUsername) {
            throw new ConflictException('Username already exists');
        }
        const userByEmail = await this.userService.user({ email: body.email });
        if (userByEmail) {
            throw new ConflictException('Email already exists');
        }

        return this.userService.createUser(body);
    }

    // @Post('update')
    // @UsePipes(new ValidationPipe())
    // async update(@Body() body: UpdateUserDto) {
    //     const userByUsername = await this.userService.user({
    //         username: body.username,
    //     });
    //     if (userByUsername) {
    //         throw new ConflictException('Username already exists');
    //     }
    //     const userByEmail = await this.userService.user({ email: body.email });
    //     if (userByEmail) {
    //         throw new ConflictException('Email already exists');
    //     }

    //     return this.userService.updateUser(body);
    // }

    @Post('update')
    @UseGuards(AuthGard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('avatar'))
    async update(
        @Body() body: UpdateUserDto,
        @UploadedFile() file: Express.Multer.File,
        @Req() req: any,
    ) {
        const userUpdate = { avatar: '' };
        if (file) {
            fs.unlink('uploads/' + req.user.avatar.split('/').pop(), () => {});
            userUpdate.avatar = `http://localhost:3000/user/images/${file.filename}`;
        }
        const updatedUser = await this.userService.updateUser({
            where: { username: req.user.username },
            data: userUpdate,
        });

        delete updatedUser.password;
        return updatedUser;
    }

    @Get('images/:fileId')
    @Header('Content-Type', 'image/jpeg')
    async serveAvatar(
        @Param('fileId') fileId: string,
        @Res() res: Response,
    ): Promise<any> {
        fs.access('uploads/' + fileId, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).send({ message: 'File not found' });
            }
            res.sendFile(fileId, { root: 'uploads' });
        });
    }

    @Get('/get/:username/stats')
    @UseGuards(AuthGard)
    async getUserStats(@Param('username') username: string) {
        const user = await this.userService.userStats(username);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        delete user.password;
        return user;
    }

    @Get('/get/:username/achievements')
    @UseGuards(AuthGard)
    async getUserAchievements(@Param('username') username: string) {
        const user = await this.userService.userAchievements(username);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        delete user.password;
        return user;
    }

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

    @Get('/get/:username/games')
    @UseGuards(AuthGard)
    async getUserGames(@Param('username') username: string) {
        const user = await this.userService.getMatchHistory(username);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Get('users')
    @UseGuards(AuthGard)
    async users() {
        return this.userService.users({});
    }
}
