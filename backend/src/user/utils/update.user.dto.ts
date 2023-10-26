import {
    IsOptional,
    Length,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { CreateUserDto } from './create.user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @MinLength(3, { message: 'Fullname is too short' })
    fullname?: string;

    @IsOptional()
    @MinLength(3, { message: 'Username is too short' })
    @MaxLength(15, { message: 'Username is too long' })
    @Matches(/^[A-Za-z][A-Za-z0-9_]{1,14}$/g, {
        message: 'Username is invalid',
    })
    username?: string;

    @IsOptional()
    @MinLength(8, { message: 'Password is too short' })
    @MaxLength(32, { message: 'Password is too long' })
    password?: string;

    @IsOptional()
    @Length(8, 32, { message: 'Password size must be between 8 and 32' })
    newPassword?: string;

    @IsOptional()
    @Length(8, 32, { message: 'Password size must be between 8 and 32' })
    confirmPassword?: string;
}
