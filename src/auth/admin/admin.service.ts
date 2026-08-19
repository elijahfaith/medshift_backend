import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { AdminRegisterDto, AdminLoginDto } from './dto/admin.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
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

    const newAdmin = new this.adminModel({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      passwordHash,
      status: 'Active',
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
    };
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
}
