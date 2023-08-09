import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CreateUserBody } from './dto/create.user.body';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    return this.user.create(body);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return this.user.fetch(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: CreateUserBody) {
    return this.user.update(id, body);
  }
}
