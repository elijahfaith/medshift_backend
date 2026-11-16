"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionAuthController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const fs = __importStar(require("fs"));
const institution_service_1 = require("./institution.service");
const cloudinary_service_1 = require("../../common/cloudinary/cloudinary.service");
const institution_dto_1 = require("./dto/institution.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const uploadDir = (0, path_1.join)(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storageConfig = (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = (0, path_1.extname)(file.originalname);
        cb(null, `inst-logo-${uniqueSuffix}${ext}`);
    },
});
let InstitutionAuthController = class InstitutionAuthController {
    institutionAuthService;
    cloudinaryService;
    constructor(institutionAuthService, cloudinaryService) {
        this.institutionAuthService = institutionAuthService;
        this.cloudinaryService = cloudinaryService;
    }
    async register(registerDto) {
        return this.institutionAuthService.register(registerDto);
    }
    async login(loginDto) {
        return this.institutionAuthService.login(loginDto);
    }
    async verifyOtp(verifyOtpDto) {
        return this.institutionAuthService.verifyOtp(verifyOtpDto);
    }
    async forgotPassword(forgotPasswordDto) {
        return this.institutionAuthService.forgotPassword(forgotPasswordDto);
    }
    async resetPassword(resetPasswordDto) {
        return this.institutionAuthService.resetPassword(resetPasswordDto);
    }
    async onboard(req, onboardDto) {
        const institutionId = req.user.userId;
        return this.institutionAuthService.onboard(institutionId, onboardDto);
    }
    async getProfile(req) {
        const institutionId = req.user.userId;
        return this.institutionAuthService.getProfile(institutionId);
    }
    async updateProfile(req, updateDto) {
        const institutionId = req.user.userId;
        return this.institutionAuthService.updateProfile(institutionId, updateDto);
    }
    async uploadLogo(req, file) {
        if (!file)
            throw new common_1.BadRequestException('Logo image file is required.');
        let fileUrl = null;
        if (file.path) {
            fileUrl = await this.cloudinaryService.upload(file.path, 'medshift/hospital_logos', 'image');
        }
        if (!fileUrl) {
            const host = req.get('host') || 'localhost:3000';
            const forwardedProto = req.headers['x-forwarded-proto'];
            const protocol = forwardedProto ? (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto.split(',')[0].trim()) : (req.protocol || 'http');
            fileUrl = `${protocol}://${host}/uploads/${file.filename}`;
        }
        const institutionId = req.user.userId;
        await this.institutionAuthService.updateProfile(institutionId, { logoUrl: fileUrl });
        return { url: fileUrl, filename: file.filename };
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
__decorate([
    (0, common_1.Post)('verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [institution_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], InstitutionAuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [institution_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], InstitutionAuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [institution_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], InstitutionAuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('onboard'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, institution_dto_1.OnboardInstitutionDto]),
    __metadata("design:returntype", Promise)
], InstitutionAuthController.prototype, "onboard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstitutionAuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, institution_dto_1.UpdateInstitutionProfileDto]),
    __metadata("design:returntype", Promise)
], InstitutionAuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('upload-logo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: storageConfig,
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/i)) {
                return cb(new common_1.BadRequestException('Only image files (JPG, PNG, WebP) are allowed for logo.'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InstitutionAuthController.prototype, "uploadLogo", null);
exports.InstitutionAuthController = InstitutionAuthController = __decorate([
    (0, common_1.Controller)('auth/institution'),
    __metadata("design:paramtypes", [institution_service_1.InstitutionAuthService,
        cloudinary_service_1.CloudinaryService])
], InstitutionAuthController);
//# sourceMappingURL=institution.controller.js.map