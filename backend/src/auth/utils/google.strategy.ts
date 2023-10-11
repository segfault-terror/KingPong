import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            clientID: configService.get('GOOGLE_CLIENT'),
            clientSecret: configService.get('GOOGLE_SECRET'),
            callbackURL: 'http://localhost:3000/auth/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: Error, user: any) => void,
    ) {
        const user = await this.authService.validateUserOAuth2({
            username:
                profile.name.givenName.toLocaleLowerCase() +
                profile.name.familyName.toLowerCase(),
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            fullname: profile.displayName,
        });

        done(null, user);
    }
}
