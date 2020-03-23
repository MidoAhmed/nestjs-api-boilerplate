import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  Delete,
  Post,
  ValidationPipe,
  Body,
  Logger,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UsersDto } from '../dto/users.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../dto/user.dto';
import { AuthUser } from '../../../decorators';
import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
  private logger = new Logger('UserController');

  constructor(private userService: UserService) {}

  @Get()
  getUsers(): Promise<UsersDto> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @AuthUser() user: UserEntity): Promise<UserDto> {
    return this.userService.getUserById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(
    @Body() createUserDto: CreateUserDto,
    @AuthUser() user: UserEntity
  ): Promise<UserDto> {
    this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createUserDto)}`);
    return this.userService.createUser(createUserDto, user);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number, 
             @AuthUser() user: UserEntity): Promise<any> {
    return this.userService.deleteUser(id, user);
  }
}
