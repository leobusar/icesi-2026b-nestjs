import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from './decorators/user/user.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { AppRoles } from './interfaces/app-roles';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginUser(@Body() loginUserDto:LoginUserDto){
    return this.authService.loginUser(loginUserDto);
  }

  @Get('decorator')
  @UseGuards(AuthGuard())
  async getUser(@UserDecorator() user: any){
    console.log(user); 
    return '';
  }

  @Get('private1')
  @UseGuards(AuthGuard())
  async private1(){
    return 'Ruta protegida 1';
  }

  @Get('private2')
  @UseGuards(AuthGuard(), UserRoleGuard)
  @SetMetadata('roles', ['admin', 'editor'])
  async private2(){
    return 'Ruta protegida 2';
  }


  @Get('private3')
  @UseGuards(AuthGuard(), UserRoleGuard)
  @RoleProtected(AppRoles.admin, AppRoles.editor)
  async private3(){
    return 'Ruta protegida 2';
  }

  @Get('private4')
  @Auth(AppRoles.admin, AppRoles.user)
  async private4(){
    return 'Ruta protegida 2';
  }
}
