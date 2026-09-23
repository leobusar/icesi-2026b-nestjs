
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "SECRETA",
    });
  }

  async validate(payload: any) {
    const id = payload.user_id;
    const user = await this.userService.findById(id);

    if(!user)
        throw new UnauthorizedException('User doesnt exists'); 

    const {password, ...userRet} = user;
    
    return userRet;
  }
}
