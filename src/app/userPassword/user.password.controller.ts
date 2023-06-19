import { Controller, Put, Body, Param } from '@nestjs/common';
import { UserPasswordService } from './user.password.service';

@Controller('password')
export class UserPasswordController {
  constructor(private readonly userPassword: UserPasswordService) {}

  @Put('solicitation')
  async solicitationNewPassword(@Body() email: { email: string }) {
    return this.userPassword.solicitationNewPassword(email);
  }

  @Put('new-password/:userId')
  async newPassword(
    @Param('userId') userId: string,
    @Body() newPassword: { newPassword: string },
  ) {
    return this.userPassword.newPassword(userId, newPassword);
  }
}
