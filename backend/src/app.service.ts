import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return '<script>window.opener.postMessage({ message: "done" }, "*");window.close();</script>';
    }
}
