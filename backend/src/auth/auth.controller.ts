import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    Post,
    Redirect,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { IntraAuthGuard } from './utils/intra.auth.guard';
import { AuthGard } from './auth.guard';
import { GoogleAuthGuard } from './utils/google.auth.guard';
import { LocalGuard } from './utils/local.guard';
import { AuthService } from './auth.service';
import { TfaDto } from './utils/tfa.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Get('intra/login')
    @UseGuards(IntraAuthGuard)
    async intraLogin() {
        // initiates the 42 login flow
    }

    @Get('intra/redirect')
    @UseGuards(IntraAuthGuard)
    @Redirect('/api')
    async intraLoginRedirect() {
        // handles the redirect from 42 with the user token
        return '<script>window.opener.postMessage({ message: "done" }, "*");window.close();</script>';
    }

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    async googleLogin() {
        // initiates the google login flow
    }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    @Redirect('/api')
    async googleLoginRedirect() {
        // handles the redirect from google with the user token
        return '<script>window.opener.postMessage({ message: "done" }, "*");window.close();</script>';
    }

    @Post('login')
    @UseGuards(LocalGuard)
    async login() {
        return { message: 'Login successful.', status: true };
    }

    @Get('status')
    async status(@Req() req: any) {
        if (req.isAuthenticated()) {
            return { message: 'You are authenticated.', status: true };
        }
        return { message: 'You are not authenticated.', status: false };
    }

    @Get('logout')
    @UseGuards(AuthGard)
    @Redirect()
    async logout(@Req() req: any, @Headers('referer') referer: string) {
        req.session.destroy();
        return { url: '/signin' };
    }

    @Post('2fa/enable')
    @UseGuards(AuthGard)
    @UsePipes(new ValidationPipe())
    async enable2FA(@Req() req: any, @Body() body: TfaDto) {
        const is2FAEnabled = await this.authService.is2FAEnabled(
            body.twoFactorAuthenticationCode,
            req.user,
        );
        if (!is2FAEnabled) {
            return { message: 'Invalid code.', status: false };
        }
        await this.authService.turnOn2FA(req.user);
    }

    @Post('2fa/authenticate')
    @UseGuards(AuthGard)
    @UsePipes(new ValidationPipe())
    async authenticate2FA(@Req() req: any, @Body() body: TfaDto) {
        console.log(body);
        const is2FAEnabled = await this.authService.is2FAEnabled(
            body.twoFactorAuthenticationCode,
            req.user,
        );
        console.log(body.twoFactorAuthenticationCode);
        if (!is2FAEnabled) {
            return { message: 'Invalid code.', status: false };
        }

        return this.authService.loginWith2FA(req.user);
    }

    @Get('2fa/generate')
    @UseGuards(AuthGard)
    async generate2FA(@Req() req: any) {
        const auth: authopt = await this.authService.generate2FASecret(
            req.user,
        );
        const qrCode = await this.authService.generateQRCode(auth.otpauth);

        return {
            qrCode: qrCode,
        };
    }
}

type authopt = {
    otpauth: string;
    secret: string;
};

