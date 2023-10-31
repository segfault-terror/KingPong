import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthGard } from '../auth/auth.guard';
import { use } from 'passport';

@Controller('notifications')
@UseGuards(AuthGard)
export class NotificationsController {
    constructor(private readonly NotificationsService: NotificationsService) {}

    @Get()
    async getAll() {
        return this.NotificationsService.getAll();
    }

    @Get("me")
    async getmyAll(@Req() data: any) {
        return this.NotificationsService.getmyAll(data.user.id);
    }

    @Post('update')
    async update(@Body() data: any) {
        return this.NotificationsService.update(data.id, data);
    }

    @Delete('delete')
    async delete(@Body() data: any) {
        return this.NotificationsService.delete(data.id);
    }

    @Delete('delete/all')
    async deleteall(@Req() data: any) {
        return this.NotificationsService.deleteAll(data.user.id);
    }

    @Post('create')
    async create(@Body() data: any) {
        return this.NotificationsService.create(data);
    }

    @Get('notreaded')
    async notreaded(@Req() data: any) {
        const readed =  await this.NotificationsService.notificationNotRead(data.user.id);
        return readed.length > 0;
    }
}
