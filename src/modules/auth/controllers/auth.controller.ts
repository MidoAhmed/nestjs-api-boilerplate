import { Controller, Post, Body, ValidationPipe, Get, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { AuthGuard } from '../../../guards';
import { AuthUser } from '../../../decorators';
import { UserEntity } from 'src/modules/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/authenticated')
  @UseGuards(AuthGuard)
  getAuthenticatedUser(@AuthUser() user: UserEntity):  UserEntity {
    return this.authService.getAuthenticatedUser(user);
  }
}
