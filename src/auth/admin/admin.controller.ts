import { Controller, Post, Body } from '@nestjs/common';
import { AdminAuthService } from './admin.service';
import { AdminRegisterDto, AdminLoginDto } from './dto/admin.dto';

@Controller('auth/admin')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('register')
  async register(@Body() registerDto: AdminRegisterDto) {
    return this.adminAuthService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: AdminLoginDto) {
    return this.adminAuthService.login(loginDto);
  }
}
