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
exports.InstitutionAuthController = void 0;
const common_1 = require("@nestjs/common");
const institution_service_1 = require("./institution.service");
const institution_dto_1 = require("./dto/institution.dto");
let InstitutionAuthController = class InstitutionAuthController {
    institutionAuthService;
    constructor(institutionAuthService) {
        this.institutionAuthService = institutionAuthService;
    }
    async register(registerDto) {
        return this.institutionAuthService.register(registerDto);
    }
    async login(loginDto) {
        return this.institutionAuthService.login(loginDto);
    }
};
exports.InstitutionAuthController = InstitutionAuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [institution_dto_1.InstitutionRegisterDto]),
    __metadata("design:returntype", Promise)
], InstitutionAuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [institution_dto_1.InstitutionLoginDto]),
    __metadata("design:returntype", Promise)
], InstitutionAuthController.prototype, "login", null);
exports.InstitutionAuthController = InstitutionAuthController = __decorate([
    (0, common_1.Controller)('auth/institution'),
    __metadata("design:paramtypes", [institution_service_1.InstitutionAuthService])
], InstitutionAuthController);
//# sourceMappingURL=institution.controller.js.map