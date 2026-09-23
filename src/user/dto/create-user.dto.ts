import { IsEmail, IsOptional, IsString, MinLength, minLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string; 

    @IsString()
    @MinLength(10)
    password: string;

    @IsString()
    name: string;
    
    @IsOptional()
    phone?: string;
}
