import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminDto } from '../admin/dto/login-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return this.authService.validateAdmin(
      loginAdminDto.username,
      loginAdminDto.password,
    );
  }
}
