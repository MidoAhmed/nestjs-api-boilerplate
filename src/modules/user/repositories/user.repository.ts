import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { InternalServerErrorException, Logger, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    
    private logger = new Logger('UserRepository');

    async createUser(createUserDto: CreateUserDto, user: UserEntity): Promise<UserDto> {
        const { username, password, firstName, lastName, phone, role } = createUserDto;
    
        const userEntity = new UserEntity();
        userEntity.username = username;
        userEntity.salt = await bcrypt.genSalt();
        userEntity.password = await bcrypt.hash(password, user.salt);
        userEntity.firstName = firstName;
        userEntity.lastName = lastName;
        userEntity.phone = phone;
        userEntity.role = role;

        try {
          const  createdUser = await this.save(userEntity);
          return plainToClass(UserDto, createdUser);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error.code === '23505') { 
                // duplicate username
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
