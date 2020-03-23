import {
    IsString,
    MinLength,
    MaxLength,
    IsNotEmpty,
    IsPhoneNumber,
    IsOptional,
    IsDefined,
  } from 'class-validator';

export class UpdateUserDto {

    
  @IsDefined()  
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber('ZZ')
  @IsOptional()
  phone: string;
}
