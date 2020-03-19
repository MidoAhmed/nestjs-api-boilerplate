import { createParamDecorator } from '@nestjs/common';
import { UserEntity } from 'src/modules/auth/user.entity';

export const AuthUser = createParamDecorator((data, request): UserEntity => request.user);
