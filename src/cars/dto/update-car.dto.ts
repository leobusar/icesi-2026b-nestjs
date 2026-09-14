import { IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";

export class UpdateCarDto {
    @Length(3,100, {"message": "La marca debe tener una longitud entre 3 y 100"})
    @IsString()
    @IsOptional()
    brand?: string; 

    @Length(3,100)
    @IsString()
    @IsOptional()
    model?: string;
    
    @IsNumber()
    @Min(1998)
    @Max(2040)
    @IsOptional()
    year?: number;
}