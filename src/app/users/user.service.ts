import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserBody } from './dto/create.user.body';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async creat(user: CreateUserBody) {
    const { name, email, password } = user;

    return await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async fetch(id: string) {
    const user = await this.findUser(id);

    return user;
  }

  async update(id: string, user: CreateUserBody) {
    await this.findUser(id);
    const { email, password, name } = user;

    const newData: CreateUserBody = {
      email,
      password,
      name,
      updatedAt: new Date(),
    };

    const updateUser = await this.prisma.user.update({
      where: { id: Number(id) },
      data: newData,
    });

    return updateUser;
  }
}
