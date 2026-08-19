import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { UserRegisterDto, UserLoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto } from './dto/user.dto';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: UserRegisterDto) {
    const existingUser = await this.userModel.findOne({
      email: registerDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('Email is already taken.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(registerDto.password, salt);
    
    // Temporary development OTP since email is not yet configured
    const devOtp = '123456';
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // Expires in 10 mins

    const newUser = new this.userModel({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      phoneNumber: registerDto.phone,
      passwordHash,
      status: 'PendingVerification',
      profession: registerDto.profession || 'Registered Nurse',
      specialty: registerDto.specialty || 'General',
      otp: devOtp,
      otpExpiry,
    });

    await newUser.save();

    const payload = {
      sub: newUser._id,
      email: newUser.email,
      role: 'user',
      clientType: registerDto.clientType,
    };
    const token = this.jwtService.sign(payload);

    return {
      Token: token,
      UserId: newUser._id,
      Email: newUser.email,
      FirstName: newUser.firstName,
      LastName: newUser.lastName,
      Status: newUser.status,
      OTP: devOtp, // For mobile app to use for verification testing
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const user = await this.userModel.findOne({ email: verifyOtpDto.email });
    if (!user) {
      throw new BadRequestException('Invalid email or OTP');
    }

    if (user.otp !== verifyOtpDto.otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    user.isVerified = true;
    user.status = 'Active';
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const payload = {
      sub: user._id,
      email: user.email,
      role: 'user',
    };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Email verified successfully',
      Token: token,
      UserId: user._id,
      Email: user.email,
      FirstName: user.firstName,
      LastName: user.lastName,
      Status: user.status,
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userModel.findOne({ email: forgotPasswordDto.email });
    if (!user) {
      // Return success even if user not found to prevent email enumeration
      return { message: 'If an account with that email exists, an OTP has been sent.' };
    }

    const devOtp = '123456'; // Mock OTP
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

    user.otp = devOtp;
    user.otpExpiry = otpExpiry;
    await user.save();

    return { 
      message: 'OTP sent successfully',
      OTP: devOtp // For development only
    };
  }

  async resetPassword(resetDto: ResetPasswordDto) {
    const user = await this.userModel.findOne({ email: resetDto.email });
    if (!user) {
      throw new BadRequestException('Invalid email or OTP');
    }

    if (user.otp !== resetDto.otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(resetDto.newPassword, salt);

    user.passwordHash = passwordHash;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return { message: 'Password reset successfully' };
  }

  async login(loginDto: UserLoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user || !user.passwordHash || !loginDto.password) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (user.status === 'Suspended' || user.status === 'Deactivated') {
      throw new UnauthorizedException('Account is suspended or deactivated.');
    }

    let currentOtp = undefined;
    if (user.status === 'PendingVerification') {
      const devOtp = '123456';
      const otpExpiry = new Date();
      otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
      user.otp = devOtp;
      user.otpExpiry = otpExpiry;
      await user.save();
      currentOtp = devOtp;
    }

    const payload = {
      sub: user._id,
      email: user.email,
      role: 'user',
      clientType: loginDto.clientType,
    };
    const token = this.jwtService.sign(payload);

    return {
      Token: token,
      UserId: user._id,
      Email: user.email,
      FirstName: user.firstName,
      LastName: user.lastName,
      Status: user.status,
      ...(currentOtp && { OTP: currentOtp }),
    };
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber || (user as any).phone,
      professionalDetails: {
        id: user._id,
        profession: user.profession || 'Registered Nurse',
        specialty: user.specialty || 'General',
        isVerified: user.isVerified || false,
        isListed: false, // Default to false until listing fee is paid
        rating: user.rating || 0.0,
        shiftsCompleted: user.shiftsCompleted || 0
      }
    };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(changePasswordDto.currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid current password');
    }

    user.passwordHash = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await user.save();

    return { message: 'Password changed successfully' };
  }
}
