import {
    Controller,
    ForbiddenException,
    Get,
    Req,
    UseGuards,
} from '@nestjs/common';
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
        req.logOut(function (err) {
            if (err) {
                throw new ForbiddenException(err);
            }
            return { message: 'You are logged out.' };
        });
        return { message: 'You are logged out.' };
    }
}
