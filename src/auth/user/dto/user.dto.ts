import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @MinLength(12, { message: 'Password must be at least 12 characters.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{12,}$/, {
    message:
      'Password must have at least one lowercase, one uppercase, one number and one special character.',
  })
  password: string;

  @IsOptional()
  @IsString()
  clientType: string;
}

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  clientType: string;
}
