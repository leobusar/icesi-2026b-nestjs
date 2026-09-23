import { IsString, Length } from "class-validator";

export class LoginUserDto {
    @IsString()
    @Length(8,50)
    readonly email: string;

    @IsString()
    @Length(8,50)
    readonly password: string;
}
