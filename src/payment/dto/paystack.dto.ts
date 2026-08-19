import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class InitializeListingPaymentDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class PaystackWebhookDto {
  event: string;
  data: {
    reference: string;
    status: string;
    amount: number;
    metadata?: {
      userId?: string;
      purpose?: string;
    };
    customer?: {
      email: string;
    };
  };
}
