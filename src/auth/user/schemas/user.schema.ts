import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  profilePictureUrl: string;

  @Prop({ default: '' })
  profession: string;

  @Prop({ default: '' })
  specialty: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: false })
  isListed: boolean;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  totalReviews: number;

  @Prop({ default: 0 })
  shiftsCompleted: number;

  @Prop({ default: 'PendingVerification' })
  status: string; // 'PendingVerification', 'Active', 'Suspended', 'Deactivated'

  @Prop()
  otp?: string;

  @Prop()
  otpExpiry?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
