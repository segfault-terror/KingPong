import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UserService) {
        super();
    }
    serializeUser(user: any, done: (err: Error, user: any) => void): any {

        done(null, user);
    }

    async deserializeUser(payload: any, done: (err: Error, user: any) => void) {
        const user = await this.userService.user({ email: payload.email });
        // check the 2fa code here
        return user ? done(null, user) : done(null, null);
    }
}
