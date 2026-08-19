import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';
import { Timesheet, TimesheetSchema } from './schemas/timesheet.schema';
import { Shift, ShiftSchema } from '../shift/schemas/shift.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Timesheet.name, schema: TimesheetSchema },
      { name: Shift.name, schema: ShiftSchema },
    ]),
  ],
  controllers: [TimesheetController],
  providers: [TimesheetService],
})
export class TimesheetModule {}
