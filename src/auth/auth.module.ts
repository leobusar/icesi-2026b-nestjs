import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    PassportModule.register({defaultStrategy: 'jwt'}), 
    JwtModule.register({secret: 'SECRETA', signOptions:{expiresIn: 100}})
  ]
})
export class AuthModule {}
