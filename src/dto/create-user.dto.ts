import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'name é obrigatorio' })
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  gender: string;

  @IsOptional()
  civilStatus: string;

  @IsNotEmpty()
  birthDate: string;
}
