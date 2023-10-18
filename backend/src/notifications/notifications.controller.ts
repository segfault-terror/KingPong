import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthGard } from '../auth/auth.guard';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly NotificationsService: NotificationsService) {}

    @Get()
    @UseGuards(AuthGard)
    async getAll() {
        return this.NotificationsService.getAll();
    }
}
