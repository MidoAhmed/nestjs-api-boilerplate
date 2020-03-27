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

  @IsString()
  @IsOptional()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsPhoneNumber('ZZ')
  @IsOptional()
  phone: string;
}
