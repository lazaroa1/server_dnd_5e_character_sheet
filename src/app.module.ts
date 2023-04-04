import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './app/users/user.controller';
import { UserService } from './app/users/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
