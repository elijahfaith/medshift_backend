import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import {
  LicensingCouncil,
  LicensingCouncilSchema,
} from './schemas/licensing-council.schema';
import {
  VerificationRequest,
  VerificationRequestSchema,
} from './schemas/verification-request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LicensingCouncil.name, schema: LicensingCouncilSchema },
      { name: VerificationRequest.name, schema: VerificationRequestSchema },
    ]),
  ],
  controllers: [VerificationController],
  providers: [VerificationService],
})
export class VerificationModule {}
