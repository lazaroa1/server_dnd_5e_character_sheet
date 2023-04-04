import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PrismaService } from '../../../../prisma/prisma.service';

@ValidatorConstraint({ name: 'EmailIsUnique', async: true })
@Injectable()
export class EmailIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(
    email: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const userId = validationArguments.object['id'];

    const haveUser = await this.prisma.user.findFirst({
      where: { email, id: { not: userId } },
    });
    return !haveUser;
  }

  defaultMessage(): string {
    return 'E-mail already in use';
  }
}
