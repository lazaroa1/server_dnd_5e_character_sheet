import { Test } from '@nestjs/testing';
import { creationRandomUser } from 'src/helpers/faker.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserPasswordController } from '../userPassword/user.password.controller';
import { UserPasswordService } from '../userPassword/user.password.service';
import { async } from 'rxjs';

const USER = creationRandomUser();

describe('Password', () => {
  let userPasswordController: UserPasswordController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserPasswordController],
      providers: [PrismaService, UserPasswordService],
    }).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    userPasswordController = moduleRef.get<UserPasswordController>(
      UserPasswordController,
    );
  });

  afterEach(async () => {
    const user = await prismaService.user.findFirst({
      where: { id: 1 },
    });

    if (user) {
      await prismaService.user.delete({ where: { id: 1 } });
    }
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });
});
