import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {

  constructor(
    @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>
  ){}

  async create(createBrandDto: CreateBrandDto) {
    try {
      const brand = this.brandRepository.create(createBrandDto); 
      return await  this.brandRepository.save(brand)
    } catch (error:any) {
      
      if (error.code==23505){
        throw new BadRequestException('brand already exists')
      }
      throw new InternalServerErrorException('error creating brand');
    }
  }

  findAll() {
    return this.brandRepository.find();
  }

  async findOne(id: string) {
    const brand: Brand | null = await this.brandRepository.findOneBy({id});
    if (brand === null)
      throw new NotFoundException(`brand with id ${id} not found`);
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const result = await this.brandRepository.update(id, updateBrandDto); 
    if(result.affected && result.affected<1)
      throw new NotFoundException(`brand with id ${id} not found`);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id); 
    const result = await  this.brandRepository.delete(id);
     
    if(result.affected && result.affected<1)
      throw new NotFoundException(`brand with id ${id} not found`);
    return this.findAll();    
  }
}
