import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SystemConfigDocument = SystemConfig & Document;

@Schema({ timestamps: true })
export class SystemConfig {
  @Prop({ default: 'default' })
  configId: string;

  @Prop({ default: 4000 })
  registrationFeeAmount: number; // In Naira (not kobo)
}

export const SystemConfigSchema = SchemaFactory.createForClass(SystemConfig);
