import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ShiftApplicantDocument = ShiftApplicant & Document;

@Schema({ timestamps: true })
export class ShiftApplicant {
  @Prop({ type: Types.ObjectId, ref: 'Shift', required: true })
  shiftId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  professionalId: Types.ObjectId;

  @Prop({ default: 'Pending' })
  status: string; // Pending, Shortlisted, Offered, Accepted, Rejected
}

export const ShiftApplicantSchema =
  SchemaFactory.createForClass(ShiftApplicant);
