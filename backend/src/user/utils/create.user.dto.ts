import { MinLength, MaxLength, Matches, IsOptional } from 'class-validator';

export class CreateUserDto {
    @MinLength(3, { message: 'Fullname is too short' })
    fullname: string;

    @MinLength(3, { message: 'Username is too short' })
    @MaxLength(15, { message: 'Username is too long' })
    @Matches(/^[A-Za-z][A-Za-z0-9_]{1,14}$/g, {
        message: 'Username is invalid',
    })
    username: string;

    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
        message: 'Email is invalid',
    })
    email: string;

    @MinLength(8, { message: 'Password is too short' })
    @MaxLength(32, { message: 'Password is too long' })
    password: string;

    @IsOptional()
    avatar: string;
}
