import { SetMetadata } from '@nestjs/common';

/**
 * how it works
 *
 * custom @Roles() decorator, we can use it to decorate the route handler method.
 *
 */

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
