import { Controller, Post, Body, ValidationPipe, Get, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../../../guards';
import { AuthUser } from '../../../decorators';
import { UserEntity } from 'src/modules/user/user.entity';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import { RegisterCredentialsDto } from '../dto/register-credentials.dto';
import { UserDto } from 'src/modules/user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) registerCredentialsDto: RegisterCredentialsDto): Promise<UserDto> {
    return this.authService.signUp(registerCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginCredentialsDto);
  }

  @Get('/authenticated')
  @UseGuards(AuthGuard)
  getAuthenticatedUser(@AuthUser() user: UserEntity):  UserDto {
    return this.authService.getAuthenticatedUser(user);
  }
}
