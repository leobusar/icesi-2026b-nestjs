import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.model';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        {
            brand: "Chevrolet",
            model: "Spark",
            year: 2020
        }, 
        {
            brand: "BYD", 
            model: "Seagull",
            year: 2025
        },
        {
            brand: "Renault",
            model: "Sandero",
            year: 2021
        }
    ]

    getAll (): Car[] {
        return this.cars;
    }

    getById(id: number): Car {
        if(!this.cars[id])
            throw new NotFoundException(`car with id ${id} not found`)
        return this.cars[id];
    }

    create(car: CreateCarDto): Car {
        this.cars.push(car);
        return car;
    }

}
