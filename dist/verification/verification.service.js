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
exports.VerificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const licensing_council_schema_1 = require("./schemas/licensing-council.schema");
const verification_request_schema_1 = require("./schemas/verification-request.schema");
let VerificationService = class VerificationService {
    councilModel;
    requestModel;
    constructor(councilModel, requestModel) {
        this.councilModel = councilModel;
        this.requestModel = requestModel;
    }
    async createCouncil(createDto) {
        const council = new this.councilModel(createDto);
        return council.save();
    }
    async getCouncils(paginationQuery) {
        const { page = 1, limit = 10 } = paginationQuery;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.councilModel.find().skip(skip).limit(limit).exec(),
            this.councilModel.countDocuments().exec(),
        ]);
        return { data, total, page, lastPage: Math.ceil(total / limit) };
    }
    async submitRequest(createDto) {
        const request = new this.requestModel({
            ...createDto,
            status: verification_request_schema_1.VerificationStatus.Pending,
        });
        return request.save();
    }
    async getRequests(paginationQuery) {
        const { page = 1, limit = 10 } = paginationQuery;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.requestModel
                .find()
                .skip(skip)
                .limit(limit)
                .populate('professionalId')
                .populate('licensingCouncilId')
                .exec(),
            this.requestModel.countDocuments().exec(),
        ]);
        return { data, total, page, lastPage: Math.ceil(total / limit) };
    }
    async getRequestById(id) {
        const request = await this.requestModel
            .findById(id)
            .populate('professionalId')
            .populate('licensingCouncilId')
            .exec();
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        return request;
    }
    async updateRequestStatus(id, updateDto) {
        const request = await this.requestModel.findById(id).exec();
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        request.status = updateDto.status;
        if (updateDto.adminNotes)
            request.adminNotes = updateDto.adminNotes;
        return request.save();
    }
};
exports.VerificationService = VerificationService;
exports.VerificationService = VerificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(licensing_council_schema_1.LicensingCouncil.name)),
    __param(1, (0, mongoose_1.InjectModel)(verification_request_schema_1.VerificationRequest.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], VerificationService);
//# sourceMappingURL=verification.service.js.map