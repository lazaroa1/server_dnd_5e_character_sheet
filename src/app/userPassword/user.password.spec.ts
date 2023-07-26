import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { creationRandomUser } from '../../helpers/faker.factory';
import { PrismaService } from '../../prisma/prisma.service';
import { UserPasswordService } from './user.password.service';

const USER = creationRandomUser();

class MailerServiceMock {
  sendMail = jest.fn();
}

describe('Password', () => {
  let userPasswordService: UserPasswordService;
  let prismaService: PrismaService;
  let mailerService: MailerServiceMock;
  beforeEach(async () => {
    prismaService = new PrismaService();
    mailerService = new MailerServiceMock();
    userPasswordService = new UserPasswordService(
      prismaService,
      mailerService as any,
    );
  });

  it('should send email when user is found', async () => {
    const userMock = { ...USER, createdAt: new Date(), updatedAt: new Date() };
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(userMock);
    await userPasswordService.solicitationNewPassword({
      email: userMock.email,
    });
    expect(mailerService.sendMail).toHaveBeenCalledWith({
      to: expect.any(String),
      from: expect.any(String),
      subject: expect.any(String),
      template: expect.any(String),
      context: expect.any(Object),
    });
  });

  it('shoud return "Email sent!" after sending email', async () => {
    const userMock = { ...USER, createdAt: new Date(), updatedAt: new Date() };
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(userMock);
    const result = await userPasswordService.solicitationNewPassword({
      email: userMock.email,
    });
    expect(result).toBe('Email sent!');
  });

  it('should throw NotFoundException if user is not found', async () => {
    const userMock = { ...USER, createdAt: new Date(), updatedAt: new Date() };
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
    await expect(
      userPasswordService.solicitationNewPassword({ email: userMock.email }),
    ).rejects.toThrowError(NotFoundException);
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
