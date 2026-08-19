import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LicensingCouncilDocument = LicensingCouncil & Document;

@Schema({ timestamps: true })
export class LicensingCouncil {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  acronym: string;

  @Prop()
  description: string;
}

export const LicensingCouncilSchema =
  SchemaFactory.createForClass(LicensingCouncil);
