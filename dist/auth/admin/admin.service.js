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
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const admin_schema_1 = require("./schemas/admin.schema");
let AdminAuthService = class AdminAuthService {
    adminModel;
    jwtService;
    constructor(adminModel, jwtService) {
        this.adminModel = adminModel;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const existingAdmin = await this.adminModel.findOne({ email: registerDto.email });
        if (existingAdmin) {
            throw new common_1.BadRequestException('Email is already taken.');
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(registerDto.password, salt);
        const newAdmin = new this.adminModel({
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            email: registerDto.email,
            passwordHash,
            status: 'Active',
        });
        await newAdmin.save();
        const payload = { sub: newAdmin._id, email: newAdmin.email, role: 'admin' };
        const token = this.jwtService.sign(payload);
        return {
            Token: token,
            UserId: newAdmin._id,
            Email: newAdmin.email,
            FirstName: newAdmin.firstName,
            LastName: newAdmin.lastName,
            Status: newAdmin.status,
        };
    }
    async login(loginDto) {
        const admin = await this.adminModel.findOne({ email: loginDto.email });
        if (!admin) {
            throw new common_1.UnauthorizedException('Invalid credentials.');
        }
        const isMatch = await bcrypt.compare(loginDto.password, admin.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials.');
        }
        if (admin.status === 'Suspended' || admin.status === 'Deactivated') {
            throw new common_1.UnauthorizedException('Account is suspended or deactivated.');
        }
        const payload = { sub: admin._id, email: admin.email, role: 'admin' };
        const token = this.jwtService.sign(payload);
        return {
            Token: token,
            UserId: admin._id,
            Email: admin.email,
            FirstName: admin.firstName,
            LastName: admin.lastName,
            Status: admin.status,
        };
    }
};
exports.AdminAuthService = AdminAuthService;
exports.AdminAuthService = AdminAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AdminAuthService);
//# sourceMappingURL=admin.service.js.map