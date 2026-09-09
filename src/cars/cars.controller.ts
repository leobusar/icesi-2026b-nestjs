import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {

    @Get('/')
    getCar (){
        return 'One Car';
    }

    @Get(':id')
    getById(@Param('id') identificador: string){
        return `Car with id ${identificador}`;
    }
}
