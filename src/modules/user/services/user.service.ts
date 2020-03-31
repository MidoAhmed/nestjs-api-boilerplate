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
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async getUsers(): Promise<UserDto[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    try {
      const users = await queryBuilder.getMany();
      return plainToClass(UserDto, users);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getUserById(id: number, user: UserEntity): Promise<UserDto> {
    const found : UserEntity = await this.userRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return plainToClass(UserDto, found);
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


  async createUser(createUserDto: CreateUserDto, user: UserEntity): Promise<UserDto> {
    return this.userRepository.createUser(createUserDto, user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, user: UserEntity): Promise<any> {

    const { firstName, lastName, phone } = updateUserDto;
    
    const userEntity = new UserEntity();
    // userEntity.username = username;
    userEntity.firstName = firstName;
    userEntity.lastName = lastName;
    userEntity.phone = phone;

    const found = await this.userRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    try {
      const result = await this.userRepository.update(id, userEntity);
      return result;
      // return plainToClass(UserDto, user);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
