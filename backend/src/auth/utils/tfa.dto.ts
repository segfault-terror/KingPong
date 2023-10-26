import { IsDecimal, IsString, Length } from 'class-validator';

export class TfaDto {
    @IsString()
    // @IsDecimal({
    //     decimal_digits: '0',
    // })
    @Length(6, 6, { message: '2FA code must be 6 characters long' })
    twoFactorAuthenticationCode: string;
}
