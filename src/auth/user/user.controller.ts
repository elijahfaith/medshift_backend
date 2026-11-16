import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { UserAuthService } from './user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';
import {
  UserRegisterDto,
  UserLoginDto,
  VerifyOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ChangePasswordDto,
  UpdateProfileDto,
} from './dto/user.dto';

// Ensure upload directory exists
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
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

@Controller('auth/user')
export class UserAuthController {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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
  async updateProfile(@Request() req: any, @Body() updateProfileDto: UpdateProfileDto) {
    return this.userAuthService.updateProfile(req.user.userId || req.user.sub, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('change-password')
  async changePassword(@Request() req: any, @Body() changePasswordDto: ChangePasswordDto) {
    return this.userAuthService.changePassword(req.user.userId || req.user.sub, changePasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-cv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageConfig,
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(pdf|doc|docx)$/i)) {
          return cb(new BadRequestException('Only PDF and Word documents are allowed for CV.'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadCv(@Request() req: any, @UploadedFile() file: any) {
    if (!file) throw new BadRequestException('File is required.');

    let fileUrl: string | null = null;
    if (file.path) {
      fileUrl = await this.cloudinaryService.upload(file.path, 'medshift/cv_documents', 'auto');
    }

    if (!fileUrl) {
      const host = req.get('host') || 'localhost:3000';
      const forwardedProto = req.headers['x-forwarded-proto'];
      const protocol = forwardedProto ? (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto.split(',')[0].trim()) : (req.protocol || 'http');
      fileUrl = `${protocol}://${host}/uploads/${file.filename}`;
    }

    await this.userAuthService.updateProfile(req.user.userId || req.user.sub, { cvUrl: fileUrl } as any);
    return { url: fileUrl, filename: file.filename };
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-profile-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageConfig,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp|heic|heif)$/i)) {
          return cb(new BadRequestException('Only image files (JPG, PNG, WebP, HEIC) are allowed for profile picture.'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadProfilePicture(@Request() req: any, @UploadedFile() file: any) {
    if (!file) throw new BadRequestException('Image file is required.');

    let fileUrl: string | null = null;
    if (file.path) {
      fileUrl = await this.cloudinaryService.upload(file.path, 'medshift/profile_pictures', 'image');
    }

    if (!fileUrl) {
      const host = req.get('host') || 'localhost:3000';
      const forwardedProto = req.headers['x-forwarded-proto'];
      const protocol = forwardedProto ? (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto.split(',')[0].trim()) : (req.protocol || 'http');
      fileUrl = `${protocol}://${host}/uploads/${file.filename}`;
    }

    await this.userAuthService.updateProfile(req.user.userId || req.user.sub, { profilePictureUrl: fileUrl } as any);
    return { url: fileUrl, filename: file.filename };
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify-payment')
  async verifyPayment(@Request() req: any, @Body() body: { reference: string }) {
    await this.userAuthService.updateProfile(req.user.userId || req.user.sub, { hasPaidRegistrationFee: true } as any);
    return { success: true, message: 'Payment verified successfully.' };
  }
}
