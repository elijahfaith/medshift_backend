import { Controller, Post, Body } from '@nestjs/common';
import { InstitutionAuthService } from './institution.service';
import {
  InstitutionRegisterDto,
  InstitutionLoginDto,
} from './dto/institution.dto';

@Controller('auth/institution')
export class InstitutionAuthController {
  constructor(
    private readonly institutionAuthService: InstitutionAuthService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: InstitutionRegisterDto) {
    return this.institutionAuthService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: InstitutionLoginDto) {
    return this.institutionAuthService.login(loginDto);
  }
}
