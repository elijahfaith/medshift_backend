import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: Types.ObjectId, ref: 'Shift', required: true })
  shiftId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  reviewerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  revieweeId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop()
  comment: string;

  @Prop({ required: true, enum: ['InstitutionToPro', 'ProToInstitution'] })
  type: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
