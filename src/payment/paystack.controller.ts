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
  Body,
} from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payment')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @Get('registration-fee')
  async getRegistrationFee() {
    const config = await this.paystackService.getRegistrationFee();
    return config;
  }

  @UseGuards(JwtAuthGuard)
  @Post('registration-fee')
  async updateRegistrationFee(@Body() body: { amountNaira: number }) {
    // In a real app, check if user is admin here
    await this.paystackService.updateRegistrationFee(body.amountNaira);
    return { success: true, newAmountNaira: body.amountNaira };
  }

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
