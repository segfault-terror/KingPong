import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async checkUsername(details: Prisma.UserCreateInput): Promise<boolean> {
        const user = await this.userService.user({
            username: details.username,
        });

        return user ? true : false;
    }

    async validateUserOAuth2(details: Prisma.UserCreateInput): Promise<any> {
        const user = await this.userService.user({ email: details.email });

        if (user) {
            return user;
        }

        while (await this.checkUsername(details)) {
            details.username += Math.floor(Math.random() * 10);
        }
        return await this.userService.createUser(details);
    }
}
