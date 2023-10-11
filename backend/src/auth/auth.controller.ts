import {
    Controller,
    Get,
    Headers,
    Redirect,
    Req,
    UseGuards,
} from '@nestjs/common';
import { IntraAuthGuard } from './utils/intra.auth.guard';
import { AuthGard } from './auth.guard';
import { GoogleAuthGuard } from './utils/google.auth.guard';

@Controller('auth')
export class AuthController {
    @Get('intra/login')
    @UseGuards(IntraAuthGuard)
    async intraLogin() {
        // initiates the 42 login flow
    }

    @Get('intra/redirect')
    @UseGuards(IntraAuthGuard)
    @Redirect('http://localhost:3000/')
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
    @Redirect('http://localhost:3000/')
    async googleLoginRedirect() {
        // handles the redirect from google with the user token
        return '<script>window.opener.postMessage({ message: "done" }, "*");window.close();</script>';
    }

    @Get('status')
    async status(@Req() req: any) {
        // checks if the user is authenticated
        // console.log(req.user);
        if (req.isAuthenticated()) {
            return { message: 'You are authenticated.', status: true };
        }
        return { message: 'You are not authenticated.', status: false };
    }

    @Get('logout')
    @UseGuards(AuthGard)
    @Redirect('http://localhost:8080/')
    async logout(@Req() req: any, @Headers('referer') referer: string) {
        // logs out the user
        req.session.destroy();
        return { url: referer };
    }
}
