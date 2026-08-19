import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InstitutionDocument = Institution & Document;

@Schema({ timestamps: true })
export class Institution {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  facilityType: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: 0 })
  lat: number;

  @Prop({ default: 0 })
  lng: number;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: 'Active' })
  status: string;
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);
