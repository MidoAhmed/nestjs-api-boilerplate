import { IsString, MinLength, MaxLength, Matches, IsDefined } from 'class-validator';

export class LoginCredentialsDto {

  @IsDefined()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly username: string;

  @IsDefined()  
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password too weak' },
  )
  readonly password: string;
}
