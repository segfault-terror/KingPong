import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IntraStrategy } from './utils/intra.strategy';
import { SessionSerializer } from './utils/session.serializer';
import { GoogleStrategy } from './utils/google.strategy';
import { LocalStrategy } from './utils/local.strategy';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [
        AuthService,
        IntraStrategy,
        GoogleStrategy,
        LocalStrategy,
        SessionSerializer,
    ],
})
export class AuthModule {}
