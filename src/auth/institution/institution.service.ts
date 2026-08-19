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

    const newInst = new this.institutionModel({
      name: registerDto.name,
      facilityType: registerDto.facilityType,
      email: registerDto.email,
      passwordHash,
      address: 'Pending',
      status: 'PendingVerification',
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
      UserId: newInst._id,
      Email: newInst.email,
      Name: newInst.name,
      Status: newInst.status,
    };
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

    if (user.status === 'Suspended' || user.status === 'Deactivated') {
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
}
