import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './interfaces/car.model';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carService: CarsService
    ) {}

    @Get('/')
    getAll (): Car[]{
        return this.carService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number){
        return this.carService.getById(id);
    }

    @Post()
    create(@Body() car: CreateCarDto){
        return this.carService.create(car);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() car: UpdateCarDto){
        return this.carService.update(id, car);
    }
    
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.carService.delete(id);
    }
}
