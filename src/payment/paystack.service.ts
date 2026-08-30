import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/user/schemas/user.schema';
import * as crypto from 'crypto';
import * as https from 'https';
import { SystemConfig, SystemConfigDocument } from './schemas/config.schema';

@Injectable()
export class PaystackService {
  private readonly secretKey = process.env.PAYSTACK_SECRET_KEY;
  private readonly publicKey = process.env.PAYSTACK_PUBLIC_KEY;
  private readonly baseUrl = 'https://api.paystack.co';

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(SystemConfig.name) private configModel: Model<SystemConfigDocument>,
  ) {}

  async getRegistrationFee(): Promise<{ feeInKobo: number; feeInNaira: number; publicKey: string }> {
    let config = await this.configModel.findOne({ configId: 'default' });
    if (!config) {
      config = await this.configModel.create({ configId: 'default', registrationFeeAmount: 4000 });
    }
    return {
      feeInKobo: config.registrationFeeAmount * 100,
      feeInNaira: config.registrationFeeAmount,
      publicKey: this.publicKey || '',
    };
  }

  async updateRegistrationFee(amountNaira: number): Promise<void> {
    await this.configModel.findOneAndUpdate(
      { configId: 'default' },
      { registrationFeeAmount: amountNaira },
      { upsert: true }
    );
  }

  async initializeListingPayment(userId: string, email: string) {
    if (!this.secretKey) {
      throw new InternalServerErrorException('Paystack secret key not configured');
    }

    const { feeInKobo } = await this.getRegistrationFee();
    const reference = `listing_${userId}_${Date.now()}`;

    const payload = JSON.stringify({
      email,
      amount: feeInKobo,
      reference,
      currency: 'NGN',
      metadata: {
        userId,
        purpose: 'listing_fee',
      },
      callback_url: `${process.env.APP_URL || 'https://medshift-backend-aqd6.onrender.com'}/payment/verify/${reference}`,
    });

    return new Promise<{ authorizationUrl: string; accessCode: string; reference: string }>(
      (resolve, reject) => {
        const options = {
          hostname: 'api.paystack.co',
          port: 443,
          path: '/transaction/initialize',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
            'Content-Length': payload.length,
          },
        };

        const req = https.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              const parsed = JSON.parse(data);
              if (!parsed.status) {
                reject(new BadRequestException(parsed.message || 'Failed to initialize payment'));
                return;
              }
              resolve({
                authorizationUrl: parsed.data.authorization_url,
                accessCode: parsed.data.access_code,
                reference: parsed.data.reference,
              });
            } catch (e) {
              reject(new InternalServerErrorException('Invalid response from Paystack'));
            }
          });
        });

        req.on('error', (e) => reject(new InternalServerErrorException(e.message)));
        req.write(payload);
        req.end();
      },
    );
  }

  async verifyAndActivate(reference: string) {
    if (!this.secretKey) {
      throw new InternalServerErrorException('Paystack secret key not configured');
    }

    return new Promise<{ success: boolean; message: string }>((resolve, reject) => {
      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/transaction/verify/${encodeURIComponent(reference)}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', async () => {
          try {
            const parsed = JSON.parse(data);
            if (!parsed.status || parsed.data?.status !== 'success') {
              resolve({ success: false, message: 'Payment not successful' });
              return;
            }
            const { feeInKobo } = await this.getRegistrationFee();
            if (parsed.data.amount < feeInKobo) {
              resolve({ success: false, message: 'Incorrect payment amount' });
              return;
            }

            const userId = parsed.data.metadata?.userId;
            if (userId) {
              await this.userModel.findByIdAndUpdate(userId, { isListed: true, hasPaidRegistrationFee: true });
            }
            resolve({ success: true, message: 'Payment verified and account activated' });
          } catch (e) {
            reject(new InternalServerErrorException('Error verifying payment'));
          }
        });
      });

      req.on('error', (e) => reject(new InternalServerErrorException(e.message)));
      req.end();
    });
  }

  async handleWebhook(signature: string, rawBody: Buffer): Promise<void> {
    if (!this.secretKey) return;

    // Verify the webhook came from Paystack
    const hash = crypto
      .createHmac('sha512', this.secretKey)
      .update(rawBody)
      .digest('hex');

    if (hash !== signature) {
      throw new BadRequestException('Invalid webhook signature');
    }

    const event = JSON.parse(rawBody.toString());

    if (event.event === 'charge.success') {
      const { feeInKobo } = await this.getRegistrationFee();
      const data = event.data;
      if (
        data.status === 'success' &&
        data.amount >= feeInKobo &&
        data.metadata?.purpose === 'listing_fee'
      ) {
        const userId = data.metadata?.userId;
        if (userId) {
          await this.userModel.findByIdAndUpdate(userId, { isListed: true, hasPaidRegistrationFee: true });
        }
      }
    }
  }
}
