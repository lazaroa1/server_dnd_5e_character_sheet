import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService],
})
export class AppModule {}
