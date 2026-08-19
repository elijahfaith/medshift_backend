import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getWallet(@Request() req: any) {
    // Both 'userId' and 'sub' map to the ID depending on jwt payload mapping
    return this.walletService.getWallet(req.user.userId || req.user.sub);
  }
}
