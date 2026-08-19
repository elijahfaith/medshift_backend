import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminAuthModule } from './auth/admin/admin.module';
import { UserAuthModule } from './auth/user/user.module';
import { InstitutionAuthModule } from './auth/institution/institution.module';
import { ShiftModule } from './shift/shift.module';
import { TimesheetModule } from './timesheet/timesheet.module';
import { PaymentModule } from './payment/payment.module';
import { VerificationModule } from './verification/verification.module';
import { TrackingModule } from './tracking/tracking.module';
import { WalletModule } from './wallet/wallet.module';
import { JwtStrategy } from './auth/guards/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/medshift',
    ),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100, // 100 requests per minute
      },
    ]),
    AdminAuthModule,
    UserAuthModule,
    InstitutionAuthModule,
    ShiftModule,
    TimesheetModule,
    PaymentModule,
    VerificationModule,
    TrackingModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
