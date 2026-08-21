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
exports.UserAuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const user_schema_1 = require("./schemas/user.schema");
let UserAuthService = class UserAuthService {
    userModel;
    jwtService;
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const existingUser = await this.userModel.findOne({
            email: registerDto.email,
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Email is already taken.');
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(registerDto.password, salt);
        const devOtp = '123456';
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
        const newUser = new this.userModel({
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            email: registerDto.email,
            phoneNumber: registerDto.phone,
            passwordHash,
            status: 'PendingVerification',
            profession: registerDto.profession || 'Registered Nurse',
            specialty: registerDto.specialty || 'General',
            otp: devOtp,
            otpExpiry,
        });
        await newUser.save();
        const payload = {
            sub: newUser._id,
            email: newUser.email,
            role: 'user',
            clientType: registerDto.clientType,
        };
        const token = this.jwtService.sign(payload);
        return {
            Token: token,
            UserId: newUser._id,
            Email: newUser.email,
            FirstName: newUser.firstName,
            LastName: newUser.lastName,
            Status: newUser.status,
            OTP: devOtp,
        };
    }
    async verifyOtp(verifyOtpDto) {
        const user = await this.userModel.findOne({ email: verifyOtpDto.email });
        if (!user) {
            throw new common_1.BadRequestException('Invalid email or OTP');
        }
        if (user.otp !== verifyOtpDto.otp || !user.otpExpiry || user.otpExpiry < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
        user.isVerified = true;
        user.status = 'Active';
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        const payload = {
            sub: user._id,
            email: user.email,
            role: 'user',
        };
        const token = this.jwtService.sign(payload);
        return {
            message: 'Email verified successfully',
            Token: token,
            UserId: user._id,
            Email: user.email,
            FirstName: user.firstName,
            LastName: user.lastName,
            Status: user.status,
        };
    }
    async forgotPassword(forgotPasswordDto) {
        const user = await this.userModel.findOne({ email: forgotPasswordDto.email });
        if (!user) {
            return { message: 'If an account with that email exists, an OTP has been sent.' };
        }
        const devOtp = '123456';
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
        user.otp = devOtp;
        user.otpExpiry = otpExpiry;
        await user.save();
        return {
            message: 'OTP sent successfully',
            OTP: devOtp
        };
    }
    async resetPassword(resetDto) {
        const user = await this.userModel.findOne({ email: resetDto.email });
        if (!user) {
            throw new common_1.BadRequestException('Invalid email or OTP');
        }
        if (user.otp !== resetDto.otp || !user.otpExpiry || user.otpExpiry < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(resetDto.newPassword, salt);
        user.passwordHash = passwordHash;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        return { message: 'Password reset successfully' };
    }
    async login(loginDto) {
        const user = await this.userModel.findOne({ email: loginDto.email });
        if (!user || !user.passwordHash || !loginDto.password) {
            throw new common_1.UnauthorizedException('Invalid credentials.');
        }
        const isMatch = await bcrypt.compare(loginDto.password, user.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials.');
        }
        if (user.status === 'Suspended' || user.status === 'Deactivated') {
            throw new common_1.UnauthorizedException('Account is suspended or deactivated.');
        }
        let currentOtp = undefined;
        if (user.status === 'PendingVerification') {
            const devOtp = '123456';
            const otpExpiry = new Date();
            otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
            user.otp = devOtp;
            user.otpExpiry = otpExpiry;
            await user.save();
            currentOtp = devOtp;
        }
        const payload = {
            sub: user._id,
            email: user.email,
            role: 'user',
            clientType: loginDto.clientType,
        };
        const token = this.jwtService.sign(payload);
        return {
            Token: token,
            UserId: user._id,
            Email: user.email,
            FirstName: user.firstName,
            LastName: user.lastName,
            Status: user.status,
            ...(currentOtp && { OTP: currentOtp }),
        };
    }
    async getProfile(userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber || user.phone,
            professionalDetails: {
                id: user._id,
                profession: user.profession || 'Registered Nurse',
                specialty: user.specialty || 'General',
                isVerified: user.isVerified || false,
                isListed: false,
                rating: user.rating || 0.0,
                shiftsCompleted: user.shiftsCompleted || 0
            }
        };
    }
    async updateProfile(userId, updateDto) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (updateDto.firstName !== undefined && updateDto.firstName.trim() !== '')
            user.firstName = updateDto.firstName.trim();
        if (updateDto.lastName !== undefined && updateDto.lastName.trim() !== '')
            user.lastName = updateDto.lastName.trim();
        if (updateDto.phone !== undefined && updateDto.phone.trim() !== '')
            user.phoneNumber = updateDto.phone.trim();
        if (updateDto.profession !== undefined && updateDto.profession.trim() !== '')
            user.profession = updateDto.profession.trim();
        if (updateDto.specialty !== undefined && updateDto.specialty.trim() !== '')
            user.specialty = updateDto.specialty.trim();
        await user.save();
        return this.getProfile(userId);
    }
    async changePassword(userId, changePasswordDto) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(changePasswordDto.currentPassword, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Invalid current password');
        }
        user.passwordHash = await bcrypt.hash(changePasswordDto.newPassword, 10);
        await user.save();
        return { message: 'Password changed successfully' };
    }
};
exports.UserAuthService = UserAuthService;
exports.UserAuthService = UserAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UserAuthService);
//# sourceMappingURL=user.service.js.map