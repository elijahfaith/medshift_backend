import { Controller, Post, Body, Get, Put, UseGuards, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserAuthService } from './user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserRegisterDto, UserLoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto, UpdateProfileDto } from './dto/user.dto';

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
  @Put('profile')
  async updateProfile(@Request() req: any, @Body() updateDto: UpdateProfileDto) {
    return this.userAuthService.updateProfile(req.user.userId || req.user.sub, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Request() req: any, @Body() changePasswordDto: ChangePasswordDto) {
    return this.userAuthService.changePassword(req.user.userId || req.user.sub, changePasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-cv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCv(@Request() req: any, @UploadedFile() file: any) {
    // Mock file upload to cloud storage
    const mockUrl = `https://mock-storage.com/cv/${Date.now()}`;
    await this.userAuthService.updateProfile(req.user.userId || req.user.sub, { cvUrl: mockUrl } as any);
    return { url: mockUrl };
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(@Request() req: any, @UploadedFile() file: any) {
    // Mock file upload to cloud storage
    const mockUrl = `https://mock-storage.com/profile/${Date.now()}`;
    await this.userAuthService.updateProfile(req.user.userId || req.user.sub, { profilePictureUrl: mockUrl } as any);
    return { url: mockUrl };
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify-payment')
  async verifyPayment(@Request() req: any, @Body() body: { reference: string }) {
    // Mock Paystack verification
    await this.userAuthService.updateProfile(req.user.userId || req.user.sub, { hasPaidRegistrationFee: true } as any);
    return { success: true, message: 'Payment verified successfully.' };
  }
}
