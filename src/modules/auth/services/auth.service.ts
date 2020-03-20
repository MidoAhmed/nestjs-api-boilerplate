import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserEntity } from 'src/modules/user/user.entity';
import { AuthRepository } from '../repositories/auth.repository';


@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
            @InjectRepository(AuthRepository) private userRepository: AuthRepository,
            private jwtService: JwtService,
          ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

    return { accessToken };
  }

  getAuthenticatedUser(user: UserEntity) : UserEntity{
    delete user.password;
    delete user.salt;
    return user;
  }
}
