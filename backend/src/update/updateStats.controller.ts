import { Controller,
	Post,
	Param,
	Body,
	UseGuards,
 } from "@nestjs/common";
import { AuthGard } from 'src/auth/auth.guard';
import { UpdateService } from "./updateStats.service";

@Controller('update')
export class UpdateController {
	constructor(
		private readonly updateService: UpdateService,
	) {}
	@Post('stats/:username')
    @UseGuards(AuthGard)
    async updateStats(
        @Param('username') username: string,
        @Body() body: any,
    ) {
        await this.updateService.updateUserStats(
            {
                username,
            },
            {
                stats: {
                    update: {
                        ...body,
                    },
                },
            },
        );
        return this.updateService.userStats(username);
    }

    @Post('user/:username')
    @UseGuards(AuthGard)
    async updateUser(
        @Param('username') username: string,
        @Body() body: any,
    ) {
        await this.updateService.updateUser(
            {
                username,
            },
            {
                ...body,
            },
        );
        return this.updateService.userStats(username);
    }
}