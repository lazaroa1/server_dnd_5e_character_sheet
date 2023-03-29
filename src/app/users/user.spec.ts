import { Test } from '@nestjs/testing';
import { creationRandomUser } from '../../helpers/faker.factory';
import { faker } from '@faker-js/faker';

import { UserController } from './user.controller';
import { PrismaService } from '../../prisma/prisma.service';

const USER = creationRandomUser();

describe('User', () => {
  let userController: UserController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [PrismaService],
    }).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    userController = moduleRef.get<UserController>(UserController);
  });

  afterEach(async () => {
    const user = await prismaService.user.findFirst({
      where: { email: USER.email },
    });

    if (user) {
      await prismaService.user.delete({ where: { id: user.id } });
    }
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  it('shoult a return a user', async () => {
    const newUser = await userController.create(USER);

    const findUser = await userController.show(String(newUser.id));

    expect(findUser).toEqual(newUser);
  });

  it('should a create a new user', async () => {
    const newUser = await userController.create(USER);

    expect(newUser).toHaveProperty('id');
    expect(newUser.name).toEqual(USER.name);
    expect(newUser.email).toEqual(USER.email);
  });

  it('should a update a user', async () => {
    const newUser = await userController.create(USER);

    const updatedUser = await userController.update(String(newUser.id), {
      name: faker.internet.userName(),
      email: newUser.email,
      password: newUser.password,
    });

    expect(newUser.email).toEqual(updatedUser.email);
    expect(newUser.password).toEqual(updatedUser.password);
    expect(newUser.name).not.toEqual(updatedUser.name);
  });
});
