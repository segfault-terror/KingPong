import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUserLocal(
            username,
            password,
        );

        if (!user) {
            return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...result } = user;

        return result;
    }
}
