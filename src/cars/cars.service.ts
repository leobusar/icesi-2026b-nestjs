import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
        private readonly brandService: BrandsService,
    ) { }

    getAll(): Promise<Car[]> {
        return this.carRepository.find({});
    }

    async getById(id: string): Promise<Car> {
        const car: Car | null = await this.carRepository.findOneBy({ id });
        if (car === null)
            throw new NotFoundException(`car with id ${id} not found`);
        return car;
    }

    async create(car: CreateCarDto): Promise<Car> {
        try {
            const brand = await this.brandService.findOne(car.brand);
            const carNew = this.carRepository.create(car);
            return await this.carRepository.save(carNew)
        } catch (error: any) {

            if (error.code == 23505) {
                throw new BadRequestException('car already exists')
            }
            if(error.status==404)
                throw new NotFoundException(`brand with id ${car.brand} not found`);

            throw new InternalServerErrorException('error creating car');
        }
    }

    async update(id: string, car: UpdateCarDto): Promise<Car> {
        const result = await this.carRepository.update(id, car);
        if (result.affected && result.affected < 1)
            throw new NotFoundException(`car with id ${id} not found`);
        return this.getById(id);
    }

    async delete(id: string) {
        await this.getById(id);
        const result = await this.carRepository.delete(id);

        if (result.affected && result.affected < 1)
            throw new NotFoundException(`car with id ${id} not found`);
        return this.getAll();
    }
}
