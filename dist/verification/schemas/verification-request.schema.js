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
exports.VerificationRequestSchema = exports.VerificationRequest = exports.VerificationStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["Draft"] = "Draft";
    VerificationStatus["Pending"] = "Pending";
    VerificationStatus["Approved"] = "Approved";
    VerificationStatus["Rejected"] = "Rejected";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
let VerificationRequest = class VerificationRequest {
    professionalId;
    licensingCouncilId;
    licenseNumber;
    dateOfBirth;
    documentUrl;
    status;
    adminNotes;
};
exports.VerificationRequest = VerificationRequest;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], VerificationRequest.prototype, "professionalId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'LicensingCouncil', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], VerificationRequest.prototype, "licensingCouncilId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], VerificationRequest.prototype, "licenseNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], VerificationRequest.prototype, "dateOfBirth", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VerificationRequest.prototype, "documentUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: VerificationStatus.Draft }),
    __metadata("design:type", String)
], VerificationRequest.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VerificationRequest.prototype, "adminNotes", void 0);
exports.VerificationRequest = VerificationRequest = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], VerificationRequest);
exports.VerificationRequestSchema = mongoose_1.SchemaFactory.createForClass(VerificationRequest);
//# sourceMappingURL=verification-request.schema.js.map