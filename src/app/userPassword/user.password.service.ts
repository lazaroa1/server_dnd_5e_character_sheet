import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from '../../prisma/prisma.service';

interface MailerServiceTest {
  sendMail: () => void;
}
@Injectable()
export class UserPasswordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService | MailerServiceTest, // private readonly mailerService: MailerService,
  ) {}

  async solicitationNewPassword({ email }) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException('User not found');

    await this.mailerService.sendMail({
      to: 'to@email.com',
      from: 'from@email.com',
      subject: 'Test Email',
      template: 'test',
      context: {},
    });

    return 'Email sent!';
  }

  async newPassword(userId, { newPassword }) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.update({
      where: { id: Number(userId) },
      data: { ...user, password: newPassword },
    });

    return 'New password updated!';
  }
}
