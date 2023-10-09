import { Controller, Get, UseGuards } from '@nestjs/common';
import { IntraAuthGuard } from './utils/intra.auth.guard';

@Controller('auth')
export class AuthController {
    @Get('intra/login')
    @UseGuards(IntraAuthGuard)
    async intraLogin() {
        // initiates the 42 login flow
    }

    @Get('intra/redirect')
    @UseGuards(IntraAuthGuard)
    async intraLoginRedirect() {
        // handles the redirect from 42 with the user token
        return { message: 'You are now logged in.' };
    }
}
