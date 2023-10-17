import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as passport from 'passport';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import { SocketIOAdapter } from './socket.io.adapter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

    const configService = app.get(ConfigService);
    const secret = configService.get<string>('SESSION_SECRET');

    const sessionMiddleware = session({
        secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 15,
        },
        store: new PrismaSessionStore(new PrismaClient(), {
            checkPeriod: 24 * 60 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    });

    app.use(sessionMiddleware);

    app.use(passport.initialize());
    app.use(passport.session());

    app.enableCors({
        origin: true,
        credentials: true,
    });

    app.useWebSocketAdapter(new SocketIOAdapter(app, sessionMiddleware));

    await app.listen(3000);
}
bootstrap();
