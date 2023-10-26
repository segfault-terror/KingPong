import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IntraStrategy } from './utils/intra.strategy';
import { SessionSerializer } from './utils/session.serializer';
import { GoogleStrategy } from './utils/google.strategy';
import { LocalStrategy } from './utils/local.strategy';
import { AuthGateway } from './auth.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtService,
        IntraStrategy,
        GoogleStrategy,
        LocalStrategy,
        SessionSerializer,
        AuthGateway,
    ],
})
export class AuthModule {}
