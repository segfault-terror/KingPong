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
    UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './utils/create.user.dto';
import { AuthGard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './utils/update.user.dto';
import * as fs from 'fs';
import { Response } from 'express';
import { BufferedFile } from 'src/minio-client/file.model';

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

    @Get('me/:data')
    @UseGuards(AuthGard)
    async meData(@Req() req: any, @Param('data') data: string) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = req.user;
        return user[data];
    }

    @Get('get/me/friends')
    @UseGuards(AuthGard)
    async myFriends(@Req() req: any) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const myFriends = await this.userService.getFriends(req.user.username);
        delete myFriends.password;
        return myFriends;
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

    @Get('get/id/:id')
    @UseGuards(AuthGard)
    async userById(@Param('id') id: string) {
        const userById = await this.userService.userById(id);
        if (!userById) {
            throw new NotFoundException('User not found');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = userById;
        return user;
    }

    @Get('search')
    @UseGuards(AuthGard)
    async search(@Query('q') q: string) {
        return this.userService.searchUsers(q);
    }

    @Post('setdata')
    @UseGuards(AuthGard)
    async updateUser(@Req() req: any) {
        const username = req.user.username;
        console.log(username);
        const userByUsername = await this.userService.user({ username });
        if (!userByUsername) {
            throw new NotFoundException('User not found');
        }
        return this.userService.updateMyData(username);
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

    @Post('update')
    @UseGuards(AuthGard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('avatar'))
    async update(
        @Body() body: UpdateUserDto,
        @UploadedFile() image: BufferedFile,
        @Req() req: any,
    ) {
        if (image) {
            const uploadedImage = await this.userService.uploadImage(image);
            body.avatar = uploadedImage.image_url;
        }
        const checkUsername = await this.userService.user({
            username: body.username,
        });
        if (checkUsername && checkUsername.username !== req.user.username) {
            throw new ConflictException('Username already exists');
        }

        if (body.password || body.newPassword || body.confirmPassword) {
            if (!body.newPassword || !body.confirmPassword) {
                throw new UnauthorizedException(
                    'Please enter your new password',
                );
            } else if (body.newPassword !== body.confirmPassword) {
                throw new UnauthorizedException(
                    'Password confirmation does not match',
                );
            }
            if (!body.password) {
                body.password = '';
            }
            const user = await this.userService.user({
                username: req.user.username,
            });
            if (user.password) {
                if (!body.password) {
                    throw new UnauthorizedException(
                        'Please enter your current password',
                    );
                }
                const validateUser = await this.userService.validateUser(
                    req.user.username,
                    body.password,
                );
                if (!validateUser) {
                    throw new UnauthorizedException('Invalid current password');
                }
            }
            body.password = body.newPassword;
            delete body.newPassword;
            delete body.confirmPassword;
        }

        const updatedUser = await this.userService.updateUser({
            where: { username: req.user.username },
            data: {
                ...body,
            },
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

    @Get('/get/stats/me')
    @UseGuards(AuthGard)
    async getMyStats(@Req() req: any) {
        const user = await this.userService.userStats(req.user.username);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        delete user.password;
        return user;
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

    @Get('isfriend/:username')
    @UseGuards(AuthGard)
    async isFriend(@Param('username') username: string, @Req() req: any) {
        return this.userService.isFriend(req.user.username, username);
    }
}
