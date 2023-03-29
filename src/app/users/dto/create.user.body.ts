import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  createdAt?: string | Date;
  updatedAt?: string | Date;
}
