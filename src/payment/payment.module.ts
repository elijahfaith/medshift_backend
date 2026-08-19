import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { EscrowPayment, EscrowPaymentSchema } from './schemas/payment.schema';
import { PaystackController } from './paystack.controller';
import { PaystackService } from './paystack.service';
import { User, UserSchema } from '../auth/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EscrowPayment.name, schema: EscrowPaymentSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PaymentController, PaystackController],
  providers: [PaymentService, PaystackService],
})
export class PaymentModule {}
