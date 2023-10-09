import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class IntraAuthGuard extends AuthGuard('42') {
    async canActivate(context: ExecutionContext) {
        try {
            const result = (await super.canActivate(context)) as boolean;
            const request = context.switchToHttp().getRequest();
            await super.logIn(request);
            return result;
        } catch {
            return false;
        }
    }
}
