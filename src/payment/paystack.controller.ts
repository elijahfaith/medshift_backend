import {
  Controller,
  Post,
  Get,
  Param,
  Headers,
  Req,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payment')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  /**
   * Called by Flutter after user taps "Pay via Paystack"
   * Returns authorization_url to launch in Paystack SDK / webview
   */
  @UseGuards(JwtAuthGuard)
  @Post('listing/initialize')
  async initializeListingPayment(@Request() req: any) {
    const userId = req.user.userId || req.user.sub;
    const email = req.user.email;
    return this.paystackService.initializeListingPayment(userId, email);
  }

  /**
   * Flutter calls this after Paystack SDK confirms payment
   * to verify server-side and flip isListed = true
   */
  @UseGuards(JwtAuthGuard)
  @Get('listing/verify/:reference')
  async verifyListingPayment(@Param('reference') reference: string) {
    return this.paystackService.verifyAndActivate(reference);
  }

  /**
   * Paystack webhook endpoint — add this URL in your Paystack dashboard
   * URL: https://medshift-backend-aqd6.onrender.com/payment/webhook
   */
  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Headers('x-paystack-signature') signature: string,
    @Req() req: any,
  ) {
    await this.paystackService.handleWebhook(signature, req.rawBody as Buffer);
    return { received: true };
  }
}
