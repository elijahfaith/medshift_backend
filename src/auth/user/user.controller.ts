import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserAuthService } from './user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserRegisterDto, UserLoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto } from './dto/user.dto';

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

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.userAuthService.verifyOtp(verifyOtpDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.userAuthService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.userAuthService.resetPassword(resetPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.userAuthService.getProfile(req.user.userId || req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Request() req: any, @Body() changePasswordDto: ChangePasswordDto) {
    return this.userAuthService.changePassword(req.user.userId || req.user.sub, changePasswordDto);
  }
}
