import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class EscrowPayment {
  @Prop({ type: Types.ObjectId, ref: 'Timesheet', required: true })
  timesheetId: Types.ObjectId;

  @Prop({ required: true })
  paystackReference: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'PendingAdminApproval' })
  status: string; // PendingAdminApproval, Processing, Paid, Failed

  @Prop()
  adminNotes: string;

  @Prop()
  processedAt: Date;
}

export type EscrowPaymentDocument = EscrowPayment & Document;
export const EscrowPaymentSchema = SchemaFactory.createForClass(EscrowPayment);
