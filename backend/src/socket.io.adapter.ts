import { INestApplicationContext } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { RequestHandler } from 'express';
import { Server, ServerOptions } from 'socket.io';
import * as passport from 'passport';

export class SocketIOAdapter extends IoAdapter {
    private session: RequestHandler;
    constructor(
        private app: INestApplicationContext,
        private sessionMiddleware: RequestHandler,
    ) {
        super(app);
        this.session = sessionMiddleware;
    }

    create(port: number, options?: ServerOptions) {
        const cors: CorsOptions = {
            origin: true,
            credentials: true,
        };

        const wrap = (middleware) => (socket, next) =>
            middleware(socket.request, {}, next);

        const optionsWithCors: ServerOptions = {
            ...options,
            cors,
            path: '/api/socket',
        };

        const server: Server = super.create(port, optionsWithCors);

        server.use(wrap(this.session));
        server.use(wrap(passport.initialize()));
        server.use(wrap(passport.session()));

        return server;
    }
}
