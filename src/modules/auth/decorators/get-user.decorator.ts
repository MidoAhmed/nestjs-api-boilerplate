import { SetMetadata } from '@nestjs/common';

export const GetUser = (...args: string[]) => SetMetadata('get-user', args);
