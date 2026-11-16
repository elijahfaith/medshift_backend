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
exports.AdminAuthController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_dto_1 = require("./dto/admin.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
let AdminAuthController = class AdminAuthController {
    adminAuthService;
    constructor(adminAuthService) {
        this.adminAuthService = adminAuthService;
    }
    async register(registerDto) {
        return this.adminAuthService.register(registerDto);
    }
    async login(loginDto) {
        return this.adminAuthService.login(loginDto);
    }
    async verifyOtp(verifyOtpDto) {
        return this.adminAuthService.verifyOtp(verifyOtpDto);
    }
    async forgotPassword(forgotPasswordDto) {
        return this.adminAuthService.forgotPassword(forgotPasswordDto);
    }
    async resetPassword(resetPasswordDto) {
        return this.adminAuthService.resetPassword(resetPasswordDto);
    }
    async getStats() {
        return this.adminAuthService.getDashboardOverview();
    }
    async getInstitutions() {
        return this.adminAuthService.getAllInstitutions();
    }
    async updateInstitutionStatus(id, status) {
        return this.adminAuthService.updateInstitutionStatus(id, status);
    }
    async getUsers() {
        return this.adminAuthService.getAllUsers();
    }
    async updateUserVerification(id, isVerified) {
        return this.adminAuthService.updateUserVerification(id, isVerified);
    }
    async getShifts() {
        return this.adminAuthService.getAllShifts();
    }
    async approveShift(id) {
        return this.adminAuthService.approveShiftListing(id);
    }
};
exports.AdminAuthController = AdminAuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.AdminRegisterDto]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.AdminLoginDto]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, new roles_guard_1.RolesGuard('admin')),
    (0, common_1.Get)('dashboard/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "getStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, new roles_guard_1.RolesGuard('admin')),
    (0, common_1.Get)('institutions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "getInstitutions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, new roles_guard_1.RolesGuard('admin')),
    (0, common_1.Put)('institution/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "updateInstitutionStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, new roles_guard_1.RolesGuard('admin')),
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "getUsers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, new roles_guard_1.RolesGuard('admin')),
    (0, common_1.Put)('user/:id/verify'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('isVerified')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "updateUserVerification", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, new roles_guard_1.RolesGuard('admin')),
    (0, common_1.Get)('shifts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "getShifts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, new roles_guard_1.RolesGuard('admin')),
    (0, common_1.Put)('shift/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "approveShift", null);
exports.AdminAuthController = AdminAuthController = __decorate([
    (0, common_1.Controller)('auth/admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminAuthService])
], AdminAuthController);
//# sourceMappingURL=admin.controller.js.map