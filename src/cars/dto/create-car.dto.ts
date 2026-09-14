import { IsNumber, IsString, Length, Max, Min } from "class-validator";

export class CreateCarDto {
    @Length(3,100, {"message": "La marca debe tener una longitud entre 3 y 100"})
    @IsString()
    brand: string; 

    @Length(3,100)
    @IsString()
    model: string;
    
    @IsNumber()
    @Min(1998)
    @Max(2040)
    year: number;
}