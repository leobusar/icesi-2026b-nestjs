import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}
  create(createUserDto: CreateUserDto): Promise<User> {
    const 
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

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({where: {email}});
    if (!user)
      throw new NotFoundException(`user with email ${email} not found`);
    return user;
  }


  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
