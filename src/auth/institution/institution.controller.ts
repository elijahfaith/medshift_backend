import { Controller, Post, Body } from '@nestjs/common';
import { InstitutionAuthService } from './institution.service';
import {
  InstitutionRegisterDto,
  InstitutionLoginDto,
  VerifyOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto/institution.dto';

@Controller('auth/institution')
export class InstitutionAuthController {
  constructor(
    private readonly institutionAuthService: InstitutionAuthService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: InstitutionRegisterDto) {
    return this.institutionAuthService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: InstitutionLoginDto) {
    return this.institutionAuthService.login(loginDto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.institutionAuthService.verifyOtp(verifyOtpDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.institutionAuthService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.institutionAuthService.resetPassword(resetPasswordDto);
  }
}
