import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateUserBody } from './create.user.body';
import { NotFoundException } from '@nestjs/common/exceptions';

@Controller('user')
export class UserController {
  constructor(private readonly prisma: PrismaService) {}

  private async findUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email, password } = body;

    return await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    const user = await this.findUser(parseInt(id));

    return user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: CreateUserBody) {
    const numberId = parseInt(id);
    await this.findUser(numberId);
    const { email, password, name } = body;

    const newData: CreateUserBody = {
      email,
      password,
      name,
      updatedAt: new Date(),
    };

    const updateUser = await this.prisma.user.update({
      where: { id: numberId },
      data: newData,
    });

    return updateUser;
  }
}
