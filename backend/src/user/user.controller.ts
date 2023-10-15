import {
    Controller,
    Get,
    Post,
    Req,
    Body,
    ConflictException,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './utils/create.user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('me')
    @UseGuards(AuthGard)
    async me(@Req() req: any) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = req.user;
        return user;
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
}
