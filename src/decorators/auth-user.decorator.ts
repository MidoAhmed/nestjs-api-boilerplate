import { createParamDecorator } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/user.entity';

export const AuthUser = createParamDecorator((data, request): UserEntity => request.user);
