import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { prismaModuleOptions } from './modules.options';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AchievementsModule } from './achievements/achievements.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
        AchievementsModule,
        NotificationsModule,
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule.forRoot(prismaModuleOptions),
        PassportModule.register({ session: true }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
