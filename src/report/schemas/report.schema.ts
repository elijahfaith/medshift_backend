import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema({ timestamps: true })
export class Report {
  @Prop({ type: Types.ObjectId, required: true })
  reporterId: Types.ObjectId;

  @Prop({ required: true })
  hospitalName: string;

  @Prop({ required: true })
  reason: string;

  @Prop()
  comment: string;

  @Prop({ default: 'Open', enum: ['Open', 'In Review', 'Resolved', 'Closed'] })
  status: string;

  @Prop({ required: true, unique: true })
  ticketNumber: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
