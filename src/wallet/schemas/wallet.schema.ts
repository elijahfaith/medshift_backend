import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ default: 0 })
  pendingBalance: number;

  @Prop({ type: [Number], default: [0, 0, 0, 0, 0, 0, 0] })
  weeklyEarnings: number[];
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
