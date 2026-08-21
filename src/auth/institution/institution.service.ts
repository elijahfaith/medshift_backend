import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Institution, InstitutionDocument } from './schemas/institution.schema';
import {
  InstitutionRegisterDto,
  InstitutionLoginDto,
  VerifyOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  OnboardInstitutionDto,
} from './dto/institution.dto';

@Injectable()
export class InstitutionAuthService {
  constructor(
    @InjectModel(Institution.name)
    private institutionModel: Model<InstitutionDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: InstitutionRegisterDto) {
    const existingInst = await this.institutionModel.findOne({
      email: registerDto.email,
    });
    if (existingInst) {
      throw new BadRequestException('Email is already taken.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(registerDto.password, salt);

    const devOtp = '123456';
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

    const newInst = new this.institutionModel({
      name: registerDto.name,
      facilityType: registerDto.facilityType,
      email: registerDto.email,
      phoneNumber: registerDto.phone,
      passwordHash,
      address: 'Pending',
      status: 'PendingVerification',
      otp: devOtp,
      otpExpiry,
    });

    await newInst.save();

    const payload = {
      sub: newInst._id,
      email: newInst.email,
      role: 'institution',
      clientType: registerDto.clientType,
    };
    const token = this.jwtService.sign(payload);

    return {
      Token: token,
      InstitutionId: newInst._id,
      Email: newInst.email,
      Name: newInst.name,
      Status: newInst.status,
      OTP: devOtp,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const inst = await this.institutionModel.findOne({ email: verifyOtpDto.email });
    if (!inst) {
      throw new BadRequestException('Invalid email or OTP');
    }

    if (inst.otp !== verifyOtpDto.otp || !inst.otpExpiry || inst.otpExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    inst.isVerified = true;
    inst.status = 'Active';
    inst.otp = undefined;
    inst.otpExpiry = undefined;
    await inst.save();

    const payload = {
      sub: inst._id,
      email: inst.email,
      role: 'institution',
    };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Email verified successfully',
      Token: token,
      InstitutionId: inst._id,
      Email: inst.email,
      Name: inst.name,
      Status: inst.status,
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const inst = await this.institutionModel.findOne({ email: forgotPasswordDto.email });
    if (!inst) {
      return { message: 'If an account with that email exists, an OTP has been sent.' };
    }

    const devOtp = '123456';
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

    inst.otp = devOtp;
    inst.otpExpiry = otpExpiry;
    await inst.save();

    return { 
      message: 'OTP sent successfully',
      OTP: devOtp 
    };
  }

  async resetPassword(resetDto: ResetPasswordDto) {
    const inst = await this.institutionModel.findOne({ email: resetDto.email });
    if (!inst) {
      throw new BadRequestException('Invalid email or OTP');
    }

    if (inst.otp !== resetDto.otp || !inst.otpExpiry || inst.otpExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(resetDto.newPassword, salt);

    inst.passwordHash = passwordHash;
    inst.otp = undefined;
    inst.otpExpiry = undefined;
    await inst.save();

    return { message: 'Password reset successfully' };
  }

  async login(loginDto: InstitutionLoginDto) {
    const inst = await this.institutionModel.findOne({ email: loginDto.email });
    if (!inst || !inst.passwordHash || !loginDto.password) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isMatch = await bcrypt.compare(loginDto.password, inst.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (inst.status === 'Suspended' || inst.status === 'Deactivated') {
      throw new UnauthorizedException('Account is suspended or deactivated.');
    }

    const payload = {
      sub: inst._id,
      email: inst.email,
      role: 'institution',
      clientType: loginDto.clientType,
    };
    const token = this.jwtService.sign(payload);

    return {
      Token: token,
      UserId: inst._id,
      Email: inst.email,
      Name: inst.name,
      Status: inst.status,
    };
  }

  async onboard(institutionId: string, onboardDto: OnboardInstitutionDto) {
    const inst = await this.institutionModel.findById(institutionId);
    if (!inst) {
      throw new BadRequestException('Institution not found');
    }

    inst.facilityType = onboardDto.facilityType;
    inst.name = onboardDto.name;
    inst.licenseNumber = onboardDto.licenseNumber;
    inst.address = onboardDto.address;
    inst.status = 'UnderReview'; // Transition to admin review

    await inst.save();

    return {
      message: 'Onboarding complete, pending review',
      InstitutionId: inst._id,
      Status: inst.status,
    };
  }
}
