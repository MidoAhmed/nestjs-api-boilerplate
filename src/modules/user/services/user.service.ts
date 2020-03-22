import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UsersDto } from '../dto/users.dto';
import { UserEntity } from '../user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async getUsers(): Promise<UsersDto> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    try {
      const users = await queryBuilder.getMany();
      return new UsersDto(users);
    } catch (error) {
      this.logger.error(`Failed to get users`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getUserById(id: number, user: UserEntity): Promise<UserDto> {
    const found = await this.userRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return new UserDto(found);
  }

  async deleteUser(id: number, user: UserEntity): Promise<any> {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return Promise.resolve({
      result: result,
      status: 'succes'
    });
  }
}
