import { IsNotEmpty, IsEmail, Validate } from 'class-validator';
import { EmailIsUnique } from './validations/validation.email';

export class CreateUserBody {
  @IsNotEmpty()
  @IsEmail()
  @Validate(EmailIsUnique)
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  createdAt?: string | Date;
  updatedAt?: string | Date;
}
