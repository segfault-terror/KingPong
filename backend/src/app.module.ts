import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { prismaModuleOptions } from './modules.options';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule.forRoot(prismaModuleOptions),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
