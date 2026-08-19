import { Controller, Post, Get, Put, Param, Body, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto, UpdatePaymentStatusDto } from './dto/payment.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(@Body() createDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createDto);
  }

  @Get()
  async getAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.paymentService.getAllPayments(paginationQuery);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.paymentService.getPaymentById(id);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdatePaymentStatusDto,
  ) {
    return this.paymentService.updatePaymentStatus(id, updateDto);
  }
}
