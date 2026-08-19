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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscrowPaymentSchema = exports.EscrowPayment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let EscrowPayment = class EscrowPayment {
    timesheetId;
    paystackReference;
    amount;
    status;
    adminNotes;
    processedAt;
};
exports.EscrowPayment = EscrowPayment;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Timesheet', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], EscrowPayment.prototype, "timesheetId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EscrowPayment.prototype, "paystackReference", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], EscrowPayment.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'PendingAdminApproval' }),
    __metadata("design:type", String)
], EscrowPayment.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EscrowPayment.prototype, "adminNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], EscrowPayment.prototype, "processedAt", void 0);
exports.EscrowPayment = EscrowPayment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], EscrowPayment);
exports.EscrowPaymentSchema = mongoose_1.SchemaFactory.createForClass(EscrowPayment);
//# sourceMappingURL=payment.schema.js.map