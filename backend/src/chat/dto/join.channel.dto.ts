import { Optional } from '@nestjs/common';
import { IsString, Length, MaxLength, MinLength } from 'class-validator';

export class JoinChannelDto {
    @IsString()
    @MinLength(1, { message: 'Channel name is too short' })
    @MaxLength(20, { message: 'Channel name is too long' })
    channelName: string;

    @IsString()
    @Optional()
    @MinLength(8, { message: 'Password is too short' })
    @MaxLength(32, { message: 'Password is too long' })
    password: string;

    @IsString()
    @Optional()
    @Length(10)
    inviteCode: string;
}
