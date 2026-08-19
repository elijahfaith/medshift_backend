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
import { UserRegisterDto, UserLoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto } from './dto/user.dto';

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
      phone: registerDto.phone,
      passwordHash,
      status: 'PendingVerification',
      profession: 'Default', // Would be updated later via another endpoint or included in registration
      specialty: 'Default',
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
    };
  }
}
