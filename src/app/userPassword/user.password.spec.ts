import { faker } from '@faker-js/faker';
import { creationRandomUser } from '../../helpers/faker.factory';
import { PrismaService } from '../../prisma/prisma.service';
import { UserPasswordService } from './user.password.service';
import { NotFoundException } from '@nestjs/common';

const USER = creationRandomUser();

describe('Password', () => {
  let userPasswordService: UserPasswordService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    prismaService = new PrismaService();
    userPasswordService = new UserPasswordService(prismaService, {});
  });

  it('should update the password for a valid user', async () => {
    const newPassword = faker.internet.password();

    prismaService.user.findUnique = jest.fn().mockResolvedValue(USER);
    prismaService.user.update = jest.fn();

    const resultNewPassword = await userPasswordService.newPassword(USER.id, {
      newPassword,
    });

    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { id: USER.id },
    });

    expect(prismaService.user.update).toHaveBeenCalledWith({
      where: { id: USER.id },
      data: { ...USER, password: newPassword },
    });

    expect(resultNewPassword).toEqual('New password updated!');
  });

  it('should throw NotFoundException for an invalid user', async () => {
    const newPassword = faker.internet.password();

    prismaService.user.findUnique = jest.fn().mockResolvedValue(null);
    prismaService.user.update = jest.fn();

    await expect(
      userPasswordService.newPassword(USER.id, { newPassword }),
    ).rejects.toThrowError(NotFoundException);

    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { id: USER.id },
    });

    expect(prismaService.user.update).not.toHaveBeenCalled();
  });
});
