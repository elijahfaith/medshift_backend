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
let VerificationController = class VerificationController {
    verificationService;
    constructor(verificationService) {
        this.verificationService = verificationService;
    }
    async createCouncil(body) {
        return this.verificationService.createCouncil(body);
    }
    async getCouncils() {
        return this.verificationService.getCouncils();
    }
    async submitRequest(body) {
        return this.verificationService.submitRequest(body);
    }
    async getAllRequests() {
        return this.verificationService.getRequests();
    }
    async getRequestById(id) {
        return this.verificationService.getRequestById(id);
    }
    async updateRequestStatus(id, body) {
        return this.verificationService.updateRequestStatus(id, body.status, body.adminNotes);
    }
};
exports.VerificationController = VerificationController;
__decorate([
    (0, common_1.Post)('council'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "createCouncil", null);
__decorate([
    (0, common_1.Get)('council'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "getCouncils", null);
__decorate([
    (0, common_1.Post)('request'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "submitRequest", null);
__decorate([
    (0, common_1.Get)('request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
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
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "updateRequestStatus", null);
exports.VerificationController = VerificationController = __decorate([
    (0, common_1.Controller)('verification'),
    __metadata("design:paramtypes", [verification_service_1.VerificationService])
], VerificationController);
//# sourceMappingURL=verification.controller.js.map