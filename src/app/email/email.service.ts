import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(): Promise<void> {
    await this.mailerService.sendMail({
      to: 'to@email.com',
      from: 'from@email.com',
      subject: 'Test Email',
      template: 'test',
      context: {},
    });
  }
}
