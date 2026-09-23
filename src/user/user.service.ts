import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOne(createUserDto.email); 

    if (existingUser)
      throw new ConflictException('Email already in use');

    const hashedPassword =  await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create (
      {
        ...createUserDto, 
        password: hashedPassword
      }); 

    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({id});
    if (!user)
      throw new NotFoundException(`user with id ${id} not found`);
    return user;
  }

  async findOne(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({where: {email}});

    return user;
  }


  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
