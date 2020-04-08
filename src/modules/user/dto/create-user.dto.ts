import {
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsNotEmpty,
    IsPhoneNumber,
    IsOptional,
    IsDefined,
    IsIn,
  } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {

    
  @IsDefined()  
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly username: string;

  @IsString()
  @IsOptional()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  @IsPhoneNumber('ZZ')
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsIn([UserRole.ADMIN, UserRole.MANAGER, UserRole.USER, UserRole.GHOST, UserRole.GUEST])
  role: UserRole;
}
