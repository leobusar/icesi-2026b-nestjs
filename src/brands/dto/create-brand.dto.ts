import { IsOptional, IsString, Length } from "class-validator";

export class CreateBrandDto {
    @Length(3,20, {"message": "La marca debe tener una longitud entre 3 y 20"})
    @IsString()
    readonly name: string; 

    @Length(3,20, {"message": "El slug debe tener una longitud entre 3 y 20"})
    @IsString()
    @IsOptional()
    readonly slug?: string;
}
