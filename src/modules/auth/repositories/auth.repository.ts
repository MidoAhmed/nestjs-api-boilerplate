import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../../user/user.entity';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import { RegisterCredentialsDto } from '../dto/register-credentials.dto';
import { UserDto } from '../../user/dto/user.dto';
import { plainToClass } from 'class-transformer';

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity> {
  private logger = new Logger('AuthRepository');

  async signUp(registerCredentialsDto: RegisterCredentialsDto): Promise<UserDto> {
    const { username, password } = registerCredentialsDto;

    const user = new UserEntity();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.firstName = registerCredentialsDto.firstName;
    user.lastName = registerCredentialsDto.lastName;
    user.phone = registerCredentialsDto.phone;


    try {
      const  registredUser : UserEntity = await this.save(user);
      return plainToClass(UserDto,  registredUser);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error.code === '23505') { // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(loginCredentialsDto: LoginCredentialsDto): Promise<string> {
    const { username, password } = loginCredentialsDto;
    const user = await this.findOne({ username });

    if (user && await user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
