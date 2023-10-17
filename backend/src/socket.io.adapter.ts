import { INestApplicationContext } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { RequestHandler } from 'express';
import { Server, ServerOptions } from 'socket.io';
import * as passport from 'passport';

export class SocketIOAdapter extends IoAdapter {
    constructor(
        private app: INestApplicationContext,
        private sessionMiddleware: RequestHandler,
    ) {
        super(app);
    }

    createIOServer(port: number, options?: ServerOptions) {
        const cors: CorsOptions = {
            origin: true,
            credentials: true,
        };

        const wrap = (middleware) => (socket, next) =>
            middleware(socket.request, {}, next);

        const optionsWithCors: ServerOptions = {
            ...options,
            cors,
        };

        const server: Server = super.createIOServer(port, optionsWithCors);

        server.use(wrap(this.sessionMiddleware));
        server.use(wrap(passport.initialize()));
        server.use(wrap(passport.session()));

        return server;
    }
}
