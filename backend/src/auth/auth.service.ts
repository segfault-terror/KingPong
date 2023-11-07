import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';
import { PrismaService } from 'nestjs-prisma';
import { UpdateUserDto } from 'src/user/utils/update.user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly prisma: PrismaService,
    ) {}

    async checkUsername(details: Prisma.UserCreateInput): Promise<boolean> {
        const user = await this.userService.user({
            username: details.username,
        });

        return user ? true : false;
    }

    async validateUserOAuth2(details: Prisma.UserCreateInput): Promise<any> {
        const user = await this.userService.user({ email: details.email });

        if (user) {
            return user;
        }

        while (await this.checkUsername(details)) {
            details.username += Math.floor(Math.random() * 10);
        }
        return await this.userService.createUser(details);
    }

    async validateUserLocal(username: string, password: string): Promise<any> {
        const user = await this.userService.user({ username });

        if (!user || !user.password) {
            return null;
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }

        return null;
    }

    async generateQRCode(optAuthUrl: string): Promise<string> {
        const qrCode = await qrcode.toDataURL(optAuthUrl);
        return qrCode;
    }

    async is2FAEnabled(
        twoFactorAuthenticationCode: string,
        user: Prisma.UserWhereUniqueInput,
    ): Promise<boolean> {
        const me = await this.prisma.user.findUnique({
            where: user,
            select: {
                twoFactorSecret: true,
            },
        });
        return authenticator.verify({
            token: twoFactorAuthenticationCode,
            secret: me.twoFactorSecret,
        });
    }

    async turnOn2FA(user: Prisma.UserWhereUniqueInput): Promise<void> {
        await this.userService.updateUser({
            where: user,
            data: {
                twoFactorEnabled: true,
                needOtp: false,
            },
        });
    }

    async set2FA(
        secret: string,
        user: Prisma.UserWhereUniqueInput,
    ): Promise<void> {
        await this.userService.updateUser({
            where: user,
            data: {
                twoFactorSecret: secret,
            },
        });
    }

    async generate2FASecret(
        user: Prisma.UserWhereUniqueInput,
    ): Promise<{ secret: string; otpauth: string }> {
        const mysecret = this.prisma.user.findUnique({
            where: user,
            select: {
                twoFactorSecret: true,
            },
        });
        if (!!(await mysecret).twoFactorSecret) {
            return {
                otpauth: authenticator.keyuri(
                    user.email,
                    'KingPong',
                    (await mysecret).twoFactorSecret,
                ),
                secret: (await mysecret).twoFactorSecret,
            };
        }
        const secret = authenticator.generateSecret();

        const otpauth = authenticator.keyuri(user.email, 'KingPong', secret);

        await this.set2FA(secret, user);
        return {
            secret,
            otpauth,
        };
    }

    async loginWith2FA(user: Prisma.UserWhereUniqueInput): Promise<any> {
        const payload = {
            email: user.email,
            sub: user.id,

            twoFactorEnabled: !!user.twoFactorEnabled,
            isTwoFactorAuthenticated: true,
        };

        this.userService.updateUser({
            where: user,
            data: {
                twoFactorEnabled: true,
            },
        });
    }

    async turnOnOtp(user: Prisma.UserWhereUniqueInput): Promise<void> {
        await this.userService.updateUser({
            where: user,
            data: {
                needOtp: false,
            },
        });
    }

    async turnOffOtp(user: Prisma.UserWhereUniqueInput): Promise<void> {
        await this.userService.updateUser({
            where: user,
            data: {
                needOtp: true,
            },
        });
    }
}
