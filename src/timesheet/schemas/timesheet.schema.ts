import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TimesheetDocument = Timesheet & Document;

@Schema({ timestamps: true })
export class Timesheet {
  @Prop({ type: Types.ObjectId, ref: 'Shift', required: true })
  shiftId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  professionalId: Types.ObjectId;

  @Prop({ required: true })
  clockInTime: Date;

  @Prop()
  clockOutTime: Date;

  @Prop({ default: 0 })
  approvedHours: number;

  @Prop({ default: 0 })
  calculatedEarnings: number;

  @Prop({ default: 'PendingApproval' })
  status: string; // PendingApproval, Approved, Rejected, Paid
}

export const TimesheetSchema = SchemaFactory.createForClass(Timesheet);
