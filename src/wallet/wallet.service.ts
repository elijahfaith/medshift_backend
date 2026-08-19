import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
  ) {}

  async getWallet(userId: string) {
    try {
      let wallet = await this.walletModel.findOne({ userId: new Types.ObjectId(userId) });
      
      if (!wallet) {
        wallet = new this.walletModel({
          userId: new Types.ObjectId(userId),
          balance: 0,
          pendingBalance: 0,
          weeklyEarnings: [0, 0, 0, 0, 0, 0, 0],
        });
        await wallet.save();
      }

      const transactions = await this.transactionModel
        .find({ userId: new Types.ObjectId(userId) })
        .sort({ date: -1 })
        .limit(10)
        .exec();

      return {
        balance: wallet.balance,
        pending: wallet.pendingBalance,
        weeklyEarnings: wallet.weeklyEarnings,
        transactions: transactions.map(tx => ({
          id: tx._id.toString(),
          title: tx.title,
          amount: tx.isIncome ? `₦${tx.amount.toString()}` : `-₦${tx.amount.toString()}`,
          rawAmount: tx.amount,
          date: this.formatDate(tx.date),
          isIncome: tx.isIncome,
          status: tx.status,
        })),
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch wallet data');
    }
  }

  private formatDate(date: Date): string {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'Today';
    }
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }
}
