import { Controller, Post, Body } from '@nestjs/common';
import { UserAuthService } from './user.service';
import { UserRegisterDto, UserLoginDto } from './dto/user.dto';

@Controller('auth/user')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('register')
  async register(@Body() registerDto: UserRegisterDto) {
    return this.userAuthService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: UserLoginDto) {
    return this.userAuthService.login(loginDto);
  }
}
