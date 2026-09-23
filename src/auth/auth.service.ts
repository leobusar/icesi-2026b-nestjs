import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; 

import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, 
    private readonly jwtService: JwtService
  ){}

  async loginUser(loginUserDto: LoginUserDto){
    try {
      const {password, email} = loginUserDto;
      const user = await  this.userService.findOne(email);

      if (!user || !bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException('Invalid Credentials');

      return  {
        user_id: user.id,
        email: user.email, 
        roles: ['admin'],
        token: this.jwtService.sign({user_id: user.id})
      }
    } catch (error) {
      
    }
  }
}
