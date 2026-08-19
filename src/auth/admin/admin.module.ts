import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthController } from './admin.controller';
import { AdminAuthService } from './admin.service';
import { Admin, AdminSchema } from './schemas/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback_secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
})
export class AdminAuthModule {}
