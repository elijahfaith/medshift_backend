"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payment_schema_1 = require("./schemas/payment.schema");
let PaymentService = class PaymentService {
    paymentModel;
    constructor(paymentModel) {
        this.paymentModel = paymentModel;
    }
    async createPayment(createDto) {
        const payment = new this.paymentModel(createDto);
        return payment.save();
    }
    async getAllPayments(paginationQuery) {
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
    async getPaymentById(id) {
        const payment = await this.paymentModel
            .findById(id)
            .populate('timesheetId')
            .exec();
        if (!payment)
            throw new common_1.NotFoundException('Payment not found');
        return payment;
    }
    async updatePaymentStatus(id, updateDto) {
        const payment = await this.paymentModel.findById(id).exec();
        if (!payment)
            throw new common_1.NotFoundException('Payment not found');
        payment.status = updateDto.status;
        if (updateDto.adminNotes)
            payment.adminNotes = updateDto.adminNotes;
        if (updateDto.status === 'Paid')
            payment.processedAt = new Date();
        return payment.save();
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_schema_1.EscrowPayment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PaymentService);
//# sourceMappingURL=payment.service.js.map