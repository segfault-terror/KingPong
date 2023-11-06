import { PrismaModuleOptions } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';

export const prismaModuleOptions: PrismaModuleOptions = {
    prismaServiceOptions: {
        middlewares: [
            async (params, next) => {
                if (params.model === 'User') {
                    if (
                        params.action === 'create' ||
                        params.action === 'update'
                    ) {
                        if (params.args.data.password) {
                            const hashedPassword = await bcrypt.hash(
                                params.args.data.password,
                                10,
                            );
                            params.args.data.password = hashedPassword;
                        }
                    }
                }
                // Add password hashing for channels
                if (params.model === 'Channel') {
                    if (
                        params.action === 'create' ||
                        params.action === 'update'
                    ) {
                        if (params.args.data.password) {
                            const hashedPassword = await bcrypt.hash(
                                params.args.data.password,
                                10,
                            );
                            params.args.data.password = hashedPassword;
                        }
                    }
                }
                return await next(params);
            },
        ],
        explicitConnect: true,
    },
    isGlobal: true,
};
