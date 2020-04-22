import {
    IsString,
    MinLength,
    MaxLength,
    IsNotEmpty,
    IsPhoneNumber,
    IsOptional,
    IsDefined,
    IsIn,
  } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class UpdateUserDto {

  @IsString()
  @IsOptional()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsPhoneNumber('ZZ')
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsIn([UserRole.ADMIN, UserRole.MANAGER, UserRole.USER, UserRole.GHOST, UserRole.GUEST])
  role: UserRole;
}
