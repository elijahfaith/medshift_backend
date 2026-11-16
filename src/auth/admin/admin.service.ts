import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Institution, InstitutionDocument } from '../institution/schemas/institution.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Shift, ShiftDocument } from '../../shift/schemas/shift.schema';
import { Report, ReportDocument } from '../../report/schemas/report.schema';
import { AdminRegisterDto, AdminLoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto } from './dto/admin.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    @InjectModel(Institution.name) private institutionModel: Model<InstitutionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Shift.name) private shiftModel: Model<ShiftDocument>,
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: AdminRegisterDto) {
    const existingAdmin = await this.adminModel.findOne({
      email: registerDto.email,
    });
    if (existingAdmin) {
      throw new BadRequestException('Email is already taken.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(registerDto.password, salt);

    const devOtp = '123456';
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

    const newAdmin = new this.adminModel({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      phoneNumber: registerDto.phone,
      passwordHash,
      status: 'Active',
      otp: devOtp,
      otpExpiry,
    });

    await newAdmin.save();

    const payload = { sub: newAdmin._id, email: newAdmin.email, role: 'admin' };
    const token = this.jwtService.sign(payload);

    return {
      Token: token,
      UserId: newAdmin._id,
      Email: newAdmin.email,
      FirstName: newAdmin.firstName,
      LastName: newAdmin.lastName,
      Status: newAdmin.status,
      OTP: devOtp,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const admin = await this.adminModel.findOne({ email: verifyOtpDto.email });
    if (!admin) {
      throw new BadRequestException('Invalid email or OTP');
    }

    if (admin.otp !== verifyOtpDto.otp || !admin.otpExpiry || admin.otpExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    admin.status = 'Active';
    admin.otp = undefined;
    admin.otpExpiry = undefined;
    await admin.save();

    const payload = { sub: admin._id, email: admin.email, role: 'admin' };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Email verified successfully',
      Token: token,
      UserId: admin._id,
      Email: admin.email,
      FirstName: admin.firstName,
      LastName: admin.lastName,
      Status: admin.status,
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const admin = await this.adminModel.findOne({ email: forgotPasswordDto.email });
    if (!admin) {
      return { message: 'If an account with that email exists, an OTP has been sent.' };
    }

    const devOtp = '123456';
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

    admin.otp = devOtp;
    admin.otpExpiry = otpExpiry;
    await admin.save();

    return { 
      message: 'OTP sent successfully',
      OTP: devOtp 
    };
  }

  async resetPassword(resetDto: ResetPasswordDto) {
    const admin = await this.adminModel.findOne({ email: resetDto.email });
    if (!admin) {
      throw new BadRequestException('Invalid email or OTP');
    }

    if (admin.otp !== resetDto.otp || !admin.otpExpiry || admin.otpExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(resetDto.newPassword, salt);

    admin.passwordHash = passwordHash;
    admin.otp = undefined;
    admin.otpExpiry = undefined;
    await admin.save();

    return { message: 'Password reset successfully' };
  }

  async login(loginDto: AdminLoginDto) {
    const admin = await this.adminModel.findOne({ email: loginDto.email });
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isMatch = await bcrypt.compare(loginDto.password, admin.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (admin.status === 'Suspended' || admin.status === 'Deactivated') {
      throw new UnauthorizedException('Account is suspended or deactivated.');
    }

    const payload = { sub: admin._id, email: admin.email, role: 'admin' };
    const token = this.jwtService.sign(payload);

    return {
      Token: token,
      UserId: admin._id,
      Email: admin.email,
      FirstName: admin.firstName,
      LastName: admin.lastName,
      Status: admin.status,
    };
  }

  // ==========================================
  // ADMIN PLATFORM MANAGEMENT METHODS
  // ==========================================

  async getDashboardOverview() {
    const [
      activeProsCount,
      pendingProsCount,
      verifiedInstitutionsCount,
      pendingInstitutionsCount,
      shifts,
      reportsCount,
    ] = await Promise.all([
      this.userModel.countDocuments({ isVerified: true }),
      this.userModel.countDocuments({ isVerified: false }),
      this.institutionModel.countDocuments({ status: 'Active' }),
      this.institutionModel.countDocuments({ status: { $in: ['UnderReview', 'PendingVerification'] } }),
      this.shiftModel.find().select('estimatedTotal hourlyRate status').exec(),
      this.reportModel.countDocuments({ status: 'Pending Review' }),
    ]);

    const totalEscrow = shifts
      .filter((s) => s.status !== 'Completed' && s.status !== 'Cancelled')
      .reduce((sum, s) => sum + (s.estimatedTotal || 0), 0);

    return {
      activeProfessionals: activeProsCount,
      pendingVerifications: pendingProsCount + pendingInstitutionsCount,
      escrowHeld: totalEscrow,
      reportedJobsQueue: reportsCount,
      totalInstitutions: verifiedInstitutionsCount + pendingInstitutionsCount,
    };
  }

  async getAllInstitutions() {
    return this.institutionModel
      .find()
      .select('-passwordHash -otp -otpExpiry')
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateInstitutionStatus(institutionId: string, status: string) {
    const inst = await this.institutionModel.findByIdAndUpdate(
      institutionId,
      { status, isVerified: status === 'Active' || status === 'Verified' },
      { new: true }
    ).select('-passwordHash -otp -otpExpiry');
    if (!inst) throw new NotFoundException('Institution not found');
    return inst;
  }

  async getAllUsers() {
    return this.userModel
      .find()
      .select('-passwordHash -otp -otpExpiry')
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateUserVerification(userId: string, isVerified: boolean) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { isVerified },
      { new: true }
    ).select('-passwordHash -otp -otpExpiry');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getAllShifts() {
    return this.shiftModel
      .find()
      .populate('organizationId', 'name facilityType address')
      .sort({ createdAt: -1 })
      .exec();
  }

  async approveShiftListing(shiftId: string) {
    const shift = await this.shiftModel.findByIdAndUpdate(
      shiftId,
      { status: 'Open' },
      { new: true }
    );
    if (!shift) throw new NotFoundException('Shift not found');
    return shift;
  }
}
