import { Matches, MaxLength, MinLength } from 'class-validator';

export class CreateMessageDto {
    @MinLength(1, { message: 'Content is too short' })
    content: string;

    @MinLength(3, { message: 'Username is too short' })
    @MaxLength(15, { message: 'Username is too long' })
    @Matches(/^[A-Za-z][A-Za-z0-9_]{1,14}$/g, {
        message: 'Username is invalid',
    })
    sender: string;

    @MinLength(3, { message: 'Username is too short' })
    @MaxLength(15, { message: 'Username is too long' })
    @Matches(/^[A-Za-z][A-Za-z0-9_]{1,14}$/g, {
        message: 'Username is invalid',
    })
    receiver: string;
}
