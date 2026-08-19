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
exports.ShiftController = void 0;
const common_1 = require("@nestjs/common");
const shift_service_1 = require("./shift.service");
let ShiftController = class ShiftController {
    shiftService;
    constructor(shiftService) {
        this.shiftService = shiftService;
    }
    async create(createDto) {
        return this.shiftService.createShift(createDto);
    }
    async findNearby(lat, lng, radius) {
        return this.shiftService.getNearbyShifts(Number(lat), Number(lng), radius ? Number(radius) : undefined);
    }
    async findAll() {
        return this.shiftService.getShifts();
    }
    async findOne(id) {
        return this.shiftService.getShiftById(id);
    }
    async update(id, updateDto) {
        return this.shiftService.updateShift(id, updateDto);
    }
    async apply(id, professionalId) {
        return this.shiftService.applyForShift(id, professionalId);
    }
    async getApplicants(id) {
        return this.shiftService.getApplicantsForShift(id);
    }
};
exports.ShiftController = ShiftController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('nearby'),
    __param(0, (0, common_1.Query)('lat')),
    __param(1, (0, common_1.Query)('lng')),
    __param(2, (0, common_1.Query)('radius')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "findNearby", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/apply'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('professionalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "apply", null);
__decorate([
    (0, common_1.Get)(':id/applicants'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "getApplicants", null);
exports.ShiftController = ShiftController = __decorate([
    (0, common_1.Controller)('shift'),
    __metadata("design:paramtypes", [shift_service_1.ShiftService])
], ShiftController);
//# sourceMappingURL=shift.controller.js.map