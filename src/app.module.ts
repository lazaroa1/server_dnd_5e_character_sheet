import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './app/users/user.controller';
import { UserService } from './app/users/user.service';
import { EmailIsUnique } from './app/users/dto/validations/validation.email';
import { UserPasswordService } from './app/userPassword/user.password.service';
import { UserPasswordController } from './app/userPassword/user.password.controller';

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
      },
    }),
  ],
  controllers: [UserController, UserPasswordController],
  providers: [PrismaService, UserService, EmailIsUnique, UserPasswordService],
})
export class AppModule {}
