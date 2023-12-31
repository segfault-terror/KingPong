import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class WsAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const client = context.switchToWs().getClient();
        const request = client.request;
        return request.isAuthenticated();
    }
}
