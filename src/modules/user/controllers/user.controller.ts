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
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UsersDto } from '../dto/users.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../dto/user.dto';
import { AuthUser } from '../../../commun/decorators';
import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
  private logger = new Logger('UserController');

  constructor(private userService: UserService) {}

  @Get()
  getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number, @AuthUser() user: UserEntity): Promise<UserDto> {
    return this.userService.getUserById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(
    @Body() createUserDto: CreateUserDto,
    @AuthUser() user: UserEntity
  ): Promise<UserDto> {
    return this.userService.createUser(createUserDto, user);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number, 
             @AuthUser() user: UserEntity): Promise<any> {
    return this.userService.deleteUser(id, user);
  }

  @Put('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() user: UserEntity,
  ): Promise<any> {
    return this.userService.updateUser(id, updateUserDto, user);
  }
}
