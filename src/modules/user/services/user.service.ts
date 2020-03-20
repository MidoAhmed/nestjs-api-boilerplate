import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UsersDto } from '../dto/users.dto';

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
}
