import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { Profile } from './intra.types';

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            clientID: configService.get('INTRA_CLIENT'),
            clientSecret: configService.get('INTRA_SECRET'),
            callbackURL: 'http://localhost:3000/auth/intra/redirect',
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: (err: Error, user: any) => void,
    ) {
        const profileParsed: Profile = await JSON.parse(profile._raw);
        const {
            login,
            usual_full_name,
            email,
            image: { link: avatar },
        } = profileParsed;
        const user = await this.authService.validateUserOAuth2({
            username: login,
            email,
            avatar,
            fullname: usual_full_name,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        done(null, result);
    }
}
