import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';


@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

  
}
