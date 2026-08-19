import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VerificationRequestDocument = VerificationRequest & Document;

export enum VerificationStatus {
  Draft = 'Draft',
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

@Schema({ timestamps: true })
export class VerificationRequest {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  professionalId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'LicensingCouncil', required: true })
  licensingCouncilId: Types.ObjectId;

  @Prop({ required: true })
  licenseNumber: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop()
  documentUrl: string;

  @Prop({ default: VerificationStatus.Draft })
  status: VerificationStatus;

  @Prop()
  adminNotes: string;
}

export const VerificationRequestSchema =
  SchemaFactory.createForClass(VerificationRequest);
