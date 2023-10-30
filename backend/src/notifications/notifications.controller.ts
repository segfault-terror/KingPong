import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthGard } from '../auth/auth.guard';
import { use } from 'passport';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly NotificationsService: NotificationsService) {}

    @Get()
    @UseGuards(AuthGard)
    async getAll() {
        return this.NotificationsService.getAll();
    }

    @Post('update')
    @UseGuards(AuthGard)
    async update(@Body() data: any) {
        return this.NotificationsService.update(data.id, data);
    }

    @Delete('delete')
    @UseGuards(AuthGard)
    async delete(@Body() data: any) {
        return this.NotificationsService.delete(data.id);
    }

    @Post('create')
    @UseGuards(AuthGard)
    async create(@Body() data: any) {
        return this.NotificationsService.create(data);
    }
}
