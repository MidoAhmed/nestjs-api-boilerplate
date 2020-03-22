import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UsersDto } from '../dto/users.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../dto/user.dto';
import { AuthUser } from '../../../decorators';
import { UserEntity } from '../user.entity';

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): Promise<UsersDto> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @AuthUser() user: UserEntity): Promise<UserDto> {
    return this.userService.getUserById(id, user);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number, 
             @AuthUser() user: UserEntity): Promise<any> {
    return this.userService.deleteUser(id, user);
  }
}
