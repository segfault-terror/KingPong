import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IntraStrategy } from './utils/intra.strategy';
import { SessionSerializer } from './utils/session.serializer';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, IntraStrategy, SessionSerializer],
})
export class AuthModule {}
