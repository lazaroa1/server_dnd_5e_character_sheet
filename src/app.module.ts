import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './app/users/user.controller';
import { UserService } from './app/users/user.service';
import { EmailIsUnique } from './app/users/dto/validations/validation.email';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService, EmailIsUnique],
})
export class AppModule {}
