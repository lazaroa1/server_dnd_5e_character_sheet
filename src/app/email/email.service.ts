import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail(): void {
    this.mailerService.sendMail({
      to: 'lazaroalves36@gmail.com',
      from: 'lazaro.a1@hotmail.com',
      subject: 'Test Email',
      text: 'This is a test email from NestJS',
      html: '<b>TESTE DE ENVIO DE EMAIL</b>',
    });
  }
}
