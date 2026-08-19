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
exports.TimesheetSchema = exports.Timesheet = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Timesheet = class Timesheet {
    shiftId;
    professionalId;
    clockInTime;
    clockOutTime;
    approvedHours;
    calculatedEarnings;
    status;
};
exports.Timesheet = Timesheet;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Shift', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Timesheet.prototype, "shiftId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Timesheet.prototype, "professionalId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Timesheet.prototype, "clockInTime", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Timesheet.prototype, "clockOutTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Timesheet.prototype, "approvedHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Timesheet.prototype, "calculatedEarnings", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'PendingApproval' }),
    __metadata("design:type", String)
], Timesheet.prototype, "status", void 0);
exports.Timesheet = Timesheet = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Timesheet);
exports.TimesheetSchema = mongoose_1.SchemaFactory.createForClass(Timesheet);
//# sourceMappingURL=timesheet.schema.js.map