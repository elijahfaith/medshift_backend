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
exports.InstitutionAuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const institution_schema_1 = require("./schemas/institution.schema");
let InstitutionAuthService = class InstitutionAuthService {
    institutionModel;
    jwtService;
    constructor(institutionModel, jwtService) {
        this.institutionModel = institutionModel;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const existingInst = await this.institutionModel.findOne({
            email: registerDto.email,
        });
        if (existingInst) {
            throw new common_1.BadRequestException('Email is already taken.');
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(registerDto.password, salt);
        const devOtp = '123456';
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
        const newInst = new this.institutionModel({
            name: registerDto.name,
            facilityType: registerDto.facilityType,
            email: registerDto.email,
            phoneNumber: registerDto.phone,
            passwordHash,
            address: 'Pending',
            status: 'PendingVerification',
            otp: devOtp,
            otpExpiry,
        });
        await newInst.save();
        const payload = {
            sub: newInst._id,
            email: newInst.email,
            role: 'institution',
            clientType: registerDto.clientType,
        };
        const token = this.jwtService.sign(payload);
        return {
            Token: token,
            InstitutionId: newInst._id,
            Email: newInst.email,
            Name: newInst.name,
            Status: newInst.status,
            OTP: devOtp,
        };
    }
    async verifyOtp(verifyOtpDto) {
        const inst = await this.institutionModel.findOne({ email: verifyOtpDto.email });
        if (!inst) {
            throw new common_1.BadRequestException('Invalid email or OTP');
        }
        if (inst.otp !== verifyOtpDto.otp || !inst.otpExpiry || inst.otpExpiry < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
        inst.isVerified = true;
        inst.status = 'Active';
        inst.otp = undefined;
        inst.otpExpiry = undefined;
        await inst.save();
        const payload = {
            sub: inst._id,
            email: inst.email,
            role: 'institution',
        };
        const token = this.jwtService.sign(payload);
        return {
            message: 'Email verified successfully',
            Token: token,
            InstitutionId: inst._id,
            Email: inst.email,
            Name: inst.name,
            Status: inst.status,
        };
    }
    async forgotPassword(forgotPasswordDto) {
        const inst = await this.institutionModel.findOne({ email: forgotPasswordDto.email });
        if (!inst) {
            return { message: 'If an account with that email exists, an OTP has been sent.' };
        }
        const devOtp = '123456';
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
        inst.otp = devOtp;
        inst.otpExpiry = otpExpiry;
        await inst.save();
        return {
            message: 'OTP sent successfully',
            OTP: devOtp
        };
    }
    async resetPassword(resetDto) {
        const inst = await this.institutionModel.findOne({ email: resetDto.email });
        if (!inst) {
            throw new common_1.BadRequestException('Invalid email or OTP');
        }
        if (inst.otp !== resetDto.otp || !inst.otpExpiry || inst.otpExpiry < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(resetDto.newPassword, salt);
        inst.passwordHash = passwordHash;
        inst.otp = undefined;
        inst.otpExpiry = undefined;
        await inst.save();
        return { message: 'Password reset successfully' };
    }
    async login(loginDto) {
        const inst = await this.institutionModel.findOne({ email: loginDto.email });
        if (!inst || !inst.passwordHash || !loginDto.password) {
            throw new common_1.UnauthorizedException('Invalid credentials.');
        }
        const isMatch = await bcrypt.compare(loginDto.password, inst.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials.');
        }
        if (inst.status === 'Suspended' || inst.status === 'Deactivated') {
            throw new common_1.UnauthorizedException('Account is suspended or deactivated.');
        }
        const payload = {
            sub: inst._id,
            email: inst.email,
            role: 'institution',
            clientType: loginDto.clientType,
        };
        const token = this.jwtService.sign(payload);
        return {
            Token: token,
            UserId: inst._id,
            Email: inst.email,
            Name: inst.name,
            Status: inst.status,
        };
    }
    async onboard(institutionId, onboardDto) {
        const inst = await this.institutionModel.findById(institutionId);
        if (!inst) {
            throw new common_1.BadRequestException('Institution not found');
        }
        inst.facilityType = onboardDto.facilityType;
        inst.name = onboardDto.name;
        inst.licenseNumber = onboardDto.licenseNumber;
        inst.address = onboardDto.address;
        inst.status = 'UnderReview';
        await inst.save();
        return {
            message: 'Onboarding complete, pending review',
            InstitutionId: inst._id,
            Status: inst.status,
        };
    }
};
exports.InstitutionAuthService = InstitutionAuthService;
exports.InstitutionAuthService = InstitutionAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(institution_schema_1.Institution.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], InstitutionAuthService);
//# sourceMappingURL=institution.service.js.map