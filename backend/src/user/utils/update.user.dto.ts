import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create.user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    newPassword?: string;

    @IsOptional()
    confirmPassword?: string;
}
