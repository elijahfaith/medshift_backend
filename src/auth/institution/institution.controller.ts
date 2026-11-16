import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { InstitutionAuthService } from './institution.service';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';
import {
  InstitutionRegisterDto,
  InstitutionLoginDto,
  VerifyOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  OnboardInstitutionDto,
  UpdateInstitutionProfileDto,
} from './dto/institution.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

const uploadDir = join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storageConfig = diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, uploadDir);
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = extname(file.originalname);
    cb(null, `inst-logo-${uniqueSuffix}${ext}`);
  },
});

@Controller('auth/institution')
export class InstitutionAuthController {
  constructor(
    private readonly institutionAuthService: InstitutionAuthService,
    private readonly cloudinaryService: CloudinaryService,
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

  @UseGuards(JwtAuthGuard)
  @Put('onboard')
  async onboard(@Req() req: any, @Body() onboardDto: OnboardInstitutionDto) {
    const institutionId = req.user.userId;   // JwtStrategy returns { userId, email, clientType }
    return this.institutionAuthService.onboard(institutionId, onboardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    const institutionId = req.user.userId;
    return this.institutionAuthService.getProfile(institutionId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@Req() req: any, @Body() updateDto: UpdateInstitutionProfileDto) {
    const institutionId = req.user.userId;
    return this.institutionAuthService.updateProfile(institutionId, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-logo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageConfig,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/i)) {
          return cb(new BadRequestException('Only image files (JPG, PNG, WebP) are allowed for logo.'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadLogo(@Req() req: any, @UploadedFile() file: any) {
    if (!file) throw new BadRequestException('Logo image file is required.');

    let fileUrl: string | null = null;
    if (file.path) {
      fileUrl = await this.cloudinaryService.upload(file.path, 'medshift/hospital_logos', 'image');
    }

    if (!fileUrl) {
      const host = req.get('host') || 'localhost:3000';
      const forwardedProto = req.headers['x-forwarded-proto'];
      const protocol = forwardedProto ? (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto.split(',')[0].trim()) : (req.protocol || 'http');
      fileUrl = `${protocol}://${host}/uploads/${file.filename}`;
    }

    const institutionId = req.user.userId;
    await this.institutionAuthService.updateProfile(institutionId, { logoUrl: fileUrl });
    return { url: fileUrl, filename: file.filename };
  }
}
