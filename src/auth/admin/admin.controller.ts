import { Controller, Post, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AdminAuthService } from './admin.service';
import { AdminRegisterDto, AdminLoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto } from './dto/admin.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

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

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.adminAuthService.verifyOtp(verifyOtpDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.adminAuthService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.adminAuthService.resetPassword(resetPasswordDto);
  }

  // ==========================================
  // PROTECTED ADMIN APIS
  // ==========================================

  @UseGuards(JwtAuthGuard, new RolesGuard('admin'))
  @Get('dashboard/stats')
  async getStats() {
    return this.adminAuthService.getDashboardOverview();
  }

  @UseGuards(JwtAuthGuard, new RolesGuard('admin'))
  @Get('institutions')
  async getInstitutions() {
    return this.adminAuthService.getAllInstitutions();
  }

  @UseGuards(JwtAuthGuard, new RolesGuard('admin'))
  @Put('institution/:id/status')
  async updateInstitutionStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.adminAuthService.updateInstitutionStatus(id, status);
  }

  @UseGuards(JwtAuthGuard, new RolesGuard('admin'))
  @Get('users')
  async getUsers() {
    return this.adminAuthService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard, new RolesGuard('admin'))
  @Put('user/:id/verify')
  async updateUserVerification(
    @Param('id') id: string,
    @Body('isVerified') isVerified: boolean,
  ) {
    return this.adminAuthService.updateUserVerification(id, isVerified);
  }

  @UseGuards(JwtAuthGuard, new RolesGuard('admin'))
  @Get('shifts')
  async getShifts() {
    return this.adminAuthService.getAllShifts();
  }

  @UseGuards(JwtAuthGuard, new RolesGuard('admin'))
  @Put('shift/:id/approve')
  async approveShift(@Param('id') id: string) {
    return this.adminAuthService.approveShiftListing(id);
  }
}
