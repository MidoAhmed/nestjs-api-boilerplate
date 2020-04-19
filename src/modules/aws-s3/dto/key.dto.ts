import { IsNotEmpty, IsString, IsDefined } from 'class-validator';

export class KeyDto {
  @IsDefined()
  @IsString()  
  @IsNotEmpty()
  key: string;
}