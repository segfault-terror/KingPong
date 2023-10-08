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
                return await next(params);
            },
        ],
    },
};
