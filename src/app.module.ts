import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './app/users/user.controller';
import { UserService } from './app/users/user.service';
import { EmailController } from './app/email/email.controller';
import { EmailService } from './app/email/email.service';
import { EmailIsUnique } from './app/users/dto/validations/validation.email';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'a9ed621730582e',
          pass: 'aff2e5e1a65316',
        },
      },
      template: {
        dir: join(__dirname, 'mails'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [UserController, EmailController],
  providers: [PrismaService, UserService, EmailService, EmailIsUnique],
})
export class AppModule {}
