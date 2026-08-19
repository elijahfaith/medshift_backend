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
import { UserRegisterDto, UserLoginDto } from './dto/user.dto';

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

    const newUser = new this.userModel({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      phone: registerDto.phone,
      passwordHash,
      status: 'PendingVerification',
      profession: 'Default', // Would be updated later via another endpoint or included in registration
      specialty: 'Default',
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
    };
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
