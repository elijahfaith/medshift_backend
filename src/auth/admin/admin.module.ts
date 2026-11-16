import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthController } from './admin.controller';
import { AdminAuthService } from './admin.service';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { Institution, InstitutionSchema } from '../institution/schemas/institution.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Shift, ShiftSchema } from '../../shift/schemas/shift.schema';
import { Report, ReportSchema } from '../../report/schemas/report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Institution.name, schema: InstitutionSchema },
      { name: User.name, schema: UserSchema },
      { name: Shift.name, schema: ShiftSchema },
      { name: Report.name, schema: ReportSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback_secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
})
export class AdminAuthModule {}
