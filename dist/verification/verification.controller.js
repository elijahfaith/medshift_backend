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
exports.VerificationController = void 0;
const common_1 = require("@nestjs/common");
const verification_service_1 = require("./verification.service");
const verification_dto_1 = require("./dto/verification.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let VerificationController = class VerificationController {
    verificationService;
    constructor(verificationService) {
        this.verificationService = verificationService;
    }
    async createCouncil(createDto) {
        return this.verificationService.createCouncil(createDto);
    }
    async getCouncils(paginationQuery) {
        return this.verificationService.getCouncils(paginationQuery);
    }
    async submitRequest(createDto) {
        return this.verificationService.submitRequest(createDto);
    }
    async getAllRequests(paginationQuery) {
        return this.verificationService.getRequests(paginationQuery);
    }
    async getRequestById(id) {
        return this.verificationService.getRequestById(id);
    }
    async updateRequestStatus(id, updateDto) {
        return this.verificationService.updateRequestStatus(id, updateDto);
    }
};
exports.VerificationController = VerificationController;
__decorate([
    (0, common_1.Post)('council'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verification_dto_1.CreateLicensingCouncilDto]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "createCouncil", null);
__decorate([
    (0, common_1.Get)('council'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "getCouncils", null);
__decorate([
    (0, common_1.Post)('request'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verification_dto_1.CreateVerificationRequestDto]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "submitRequest", null);
__decorate([
    (0, common_1.Get)('request'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "getAllRequests", null);
__decorate([
    (0, common_1.Get)('request/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "getRequestById", null);
__decorate([
    (0, common_1.Put)('request/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, verification_dto_1.UpdateVerificationStatusDto]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "updateRequestStatus", null);
exports.VerificationController = VerificationController = __decorate([
    (0, common_1.Controller)('verification'),
    __metadata("design:paramtypes", [verification_service_1.VerificationService])
], VerificationController);
//# sourceMappingURL=verification.controller.js.map