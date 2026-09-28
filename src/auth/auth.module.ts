import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';


@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    PassportModule.register({defaultStrategy: 'jwt'}), 
    //JwtModule.register({secret: 'SECRETA', signOptions:{expiresIn: 100}})
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') as string | 'secret',
        signOptions:{expiresIn: configService.get('JWT_EXPIRES_IN') | 600}
      })
    })
  ]
})
export class AuthModule {}
