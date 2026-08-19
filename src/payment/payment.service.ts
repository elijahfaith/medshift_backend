import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EscrowPayment, EscrowPaymentDocument } from './schemas/payment.schema';
import { CreatePaymentDto, UpdatePaymentStatusDto } from './dto/payment.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(EscrowPayment.name)
    private paymentModel: Model<EscrowPaymentDocument>,
  ) {}

  async createPayment(createDto: CreatePaymentDto) {
    const payment = new this.paymentModel(createDto);
    return payment.save();
  }

  async getAllPayments(paginationQuery: PaginationQueryDto) {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.paymentModel
        .find()
        .skip(skip)
        .limit(limit)
        .populate('timesheetId')
        .exec(),
      this.paymentModel.countDocuments().exec(),
    ]);

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async getPaymentById(id: string) {
    const payment = await this.paymentModel
      .findById(id)
      .populate('timesheetId')
      .exec();
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async updatePaymentStatus(id: string, updateDto: UpdatePaymentStatusDto) {
    const payment = await this.paymentModel.findById(id).exec();
    if (!payment) throw new NotFoundException('Payment not found');

    payment.status = updateDto.status;
    if (updateDto.adminNotes) payment.adminNotes = updateDto.adminNotes;
    if (updateDto.status === 'Paid') payment.processedAt = new Date();

    return payment.save();
  }
}
