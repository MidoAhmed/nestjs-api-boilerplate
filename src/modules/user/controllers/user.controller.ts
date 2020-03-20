import { Controller, Get, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UsersDto } from '../dto/users.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get()
    getUsers(): Promise<UsersDto> {
        return this.userService.getUsers();
    }
}
