import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserEntity } from 'src/modules/user/user.entity';
import { AuthRepository } from '../repositories/auth.repository';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import { RegisterCredentialsDto } from '../dto/register-credentials.dto';
import { UserDto } from '../../user/dto/user.dto';
import { plainToClass } from 'class-transformer';


@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
            @InjectRepository(AuthRepository) private authRepository: AuthRepository,
            private jwtService: JwtService,
          ) {}

  async signUp(registerCredentialsDto: RegisterCredentialsDto): Promise<UserDto> {
    return this.authRepository.signUp(registerCredentialsDto);
  }

  async signIn(loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.authRepository.validateUserPassword(loginCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

    return { accessToken };
  }

  getAuthenticatedUser(user: UserEntity) : UserDto{
    return  plainToClass(UserDto,  user);
  }
}
