import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class IntraAuthGuard extends AuthGuard('42') {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        try {
            const result = (await super.canActivate(context)) as boolean;
            await super.logIn(request);
            if (result) {
                return true;
            }
            request.res.redirect('/api');
            return result;
        } catch {
            request.res.redirect('/api');
            return false;
        }
    }
}
