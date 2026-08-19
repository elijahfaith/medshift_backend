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
exports.ShiftSchema = exports.Shift = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Shift = class Shift {
    organizationId;
    department;
    position;
    hourlyRate;
    estimatedTotal;
    startTime;
    endTime;
    isUrgent;
    requirements;
    minYearsExperience;
    status;
    location;
};
exports.Shift = Shift;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Institution', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Shift.prototype, "organizationId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Shift.prototype, "department", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Shift.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Shift.prototype, "hourlyRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Shift.prototype, "estimatedTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Shift.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Shift.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Shift.prototype, "isUrgent", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Shift.prototype, "requirements", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Shift.prototype, "minYearsExperience", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Draft' }),
    __metadata("design:type", String)
], Shift.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    }),
    __metadata("design:type", Object)
], Shift.prototype, "location", void 0);
exports.Shift = Shift = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Shift);
exports.ShiftSchema = mongoose_1.SchemaFactory.createForClass(Shift);
exports.ShiftSchema.index({ location: '2dsphere' });
//# sourceMappingURL=shift.schema.js.map