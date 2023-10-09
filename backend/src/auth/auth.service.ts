import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUserOAuth2(details: User): Promise<any> {
        const user = await this.userService.user({ email: details.email });

        if (user) {
            return user;
        }
        return await this.userService.createUser(details);
    }
}
