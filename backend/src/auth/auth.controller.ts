import {
    Controller,
    Get,
    Headers,
    Post,
    Redirect,
    Req,
    UseGuards,
} from '@nestjs/common';
import { IntraAuthGuard } from './utils/intra.auth.guard';
import { AuthGard } from './auth.guard';
import { GoogleAuthGuard } from './utils/google.auth.guard';
import { LocalGuard } from './utils/local.guard';

@Controller('auth')
export class AuthController {
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
}
