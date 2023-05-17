import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
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
    }),
  ],
  controllers: [UserController, EmailController],
  providers: [PrismaService, UserService, EmailService, EmailIsUnique],
})
export class AppModule {}
