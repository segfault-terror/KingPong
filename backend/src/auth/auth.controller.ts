import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { IntraAuthGuard } from './utils/intra.auth.guard';
import { AuthGard } from './auth.guard';

@Controller('auth')
export class AuthController {
    @Get('intra/login')
    @UseGuards(IntraAuthGuard)
    async intraLogin() {
        // initiates the 42 login flow
    }

    @Get('intra/redirect')
    @UseGuards(IntraAuthGuard)
    @Redirect('http://localhost:3000/auth/status')
    async intraLoginRedirect() {
        // handles the redirect from 42 with the user token
        return { message: 'You are now logged in.' };
    }

    @Get('status')
    @UseGuards(AuthGard)
    async status() {
        // checks if the user is authenticated
        // console.log(req.user);
        return { message: 'You are authenticated.' };
    }

    @Get('logout')
    @UseGuards(AuthGard)
    async logout(@Req() req: any) {
        // logs out the user
        req.session.destroy();
        return { message: 'You are logged out.' };
    }
}
