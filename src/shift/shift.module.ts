import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';
import { Shift, ShiftSchema } from './schemas/shift.schema';
import {
  ShiftApplicant,
  ShiftApplicantSchema,
} from './schemas/shift-applicant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shift.name, schema: ShiftSchema },
      { name: ShiftApplicant.name, schema: ShiftApplicantSchema },
    ]),
  ],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
