import {
    IsOptional,
    IsEnum,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

enum ChannelType {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
    PROTECTED = 'PROTECTED',
}

export class CreateChannelDto {
    @IsString()
    @MinLength(1, { message: 'Channel name is too short' })
    @MaxLength(20, { message: 'Channel name is too long' })
    channelName: string;

    @IsEnum(ChannelType)
    channelType: ChannelType;

    @IsString()
    @IsOptional()
    @MinLength(8, { message: 'Password is too short' })
    @MaxLength(32, { message: 'Password is too long' })
    password?: string;
}
