import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { InternalServerErrorException, Logger, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    
    private logger = new Logger('UserRepository');

    async createUser(createUserDto: CreateUserDto, user: UserEntity): Promise<UserDto> {
        const { username, password, firstName, lastName, phone } = createUserDto;
    
        const userEntity = new UserEntity();
        userEntity.username = username;
        userEntity.salt = await bcrypt.genSalt();
        userEntity.password = await bcrypt.hash(password, user.salt);
        userEntity.firstName = firstName;
        userEntity.lastName = lastName;
        userEntity.phone = phone;

        try {
          const  createdUser = await userEntity.save();
          return new UserDto(createdUser);
        } catch (error) {
            if (error.code === '23505') { // duplicate username
                throw new ConflictException('Username already exists');
            } else {
                this.logger.error(`Failed to create a user for user "${user.username}". Data: ${CreateUserDto}`, error.stack);
                throw new InternalServerErrorException();
            }
        }
    }
}
