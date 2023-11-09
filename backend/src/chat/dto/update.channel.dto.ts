import { PartialType } from '@nestjs/mapped-types';
import { CreateChannelDto } from './create.channel.dto';
import {
    IsEnum,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

enum ChannelType {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
    PROTECTED = 'PROTECTED',
}

export class UpdateChannelDto extends PartialType(CreateChannelDto) {
    @IsOptional()
    @IsString()
    @MinLength(1, { message: 'Channel name is too short' })
    @MaxLength(20, { message: 'Channel name is too long' })
    newName?: string;

    @IsOptional()
    @IsEnum(ChannelType)
    newType?: ChannelType;

    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'Password is too short' })
    @MaxLength(32, { message: 'Password is too long' })
    password?: string;
}
