import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUserOAuth2(details: Prisma.UserCreateInput): Promise<any> {
        const user = await this.userService.user({ email: details.email });

        if (user) {
            return user;
        }
        return await this.userService.createUser(details);
    }
}
