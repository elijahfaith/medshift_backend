import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { EscrowPayment, EscrowPaymentSchema } from './schemas/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EscrowPayment.name, schema: EscrowPaymentSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
