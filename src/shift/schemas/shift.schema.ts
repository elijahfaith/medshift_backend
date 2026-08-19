import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ShiftDocument = Shift & Document;

@Schema({ timestamps: true })
export class Shift {
  @Prop({ type: Types.ObjectId, ref: 'Institution', required: true })
  organizationId: Types.ObjectId;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  hourlyRate: number;

  @Prop({ required: true })
  estimatedTotal: number;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ default: false })
  isUrgent: boolean;

  @Prop()
  requirements: string;

  @Prop({ default: 0 })
  minYearsExperience: number;

  @Prop({ default: 'Draft' })
  status: string; // Draft, Published, Open, Filled, Completed, Cancelled

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0], // [longitude, latitude]
    },
  })
  location: {
    type: string;
    coordinates: number[];
  };

  @Prop()
  accessCode: string;

  @Prop()
  qrCodeData: string;
}

export const ShiftSchema = SchemaFactory.createForClass(Shift);
ShiftSchema.index({ location: '2dsphere' });
