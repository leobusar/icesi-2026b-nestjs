import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.model';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

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

    update(id: number, car:UpdateCarDto ): Car{
        const oldCar = this.getById(id);
        console.log(oldCar);
        console.log(car);

        const newCar = Object.fromEntries(
            Object.entries(car).filter(([_,value]) => value != undefined));
        console.log(newCar);

        this.cars[id] = {
            ...oldCar,
            ...newCar
        };
        return this.cars[id];
    }

    delete(id: number ){
        const oldCar = this.getById(id);
        this.cars= this.cars.filter(car => car != oldCar)
    }
}
