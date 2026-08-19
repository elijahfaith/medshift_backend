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
exports.ShiftService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const shift_schema_1 = require("./schemas/shift.schema");
const shift_applicant_schema_1 = require("./schemas/shift-applicant.schema");
let ShiftService = class ShiftService {
    shiftModel;
    applicantModel;
    constructor(shiftModel, applicantModel) {
        this.shiftModel = shiftModel;
        this.applicantModel = applicantModel;
    }
    async createShift(createDto) {
        const newShift = new this.shiftModel(createDto);
        return newShift.save();
    }
    async getShifts() {
        return this.shiftModel.find().exec();
    }
    async getShiftById(id) {
        const shift = await this.shiftModel.findById(id).exec();
        if (!shift)
            throw new common_1.NotFoundException('Shift not found');
        return shift;
    }
    async updateShift(id, updateDto) {
        const shift = await this.shiftModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
        if (!shift)
            throw new common_1.NotFoundException('Shift not found');
        return shift;
    }
    async applyForShift(shiftId, professionalId) {
        const application = new this.applicantModel({
            shiftId: new mongoose_2.Types.ObjectId(shiftId),
            professionalId: new mongoose_2.Types.ObjectId(professionalId),
            status: 'Pending',
        });
        return application.save();
    }
    async getApplicantsForShift(shiftId) {
        return this.applicantModel.find({ shiftId: new mongoose_2.Types.ObjectId(shiftId) }).populate('professionalId').exec();
    }
    async getNearbyShifts(lat, lng, maxDistanceInMeters = 50000) {
        return this.shiftModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [lng, lat],
                    },
                    $maxDistance: maxDistanceInMeters,
                },
            },
            status: 'Open',
        }).exec();
    }
};
exports.ShiftService = ShiftService;
exports.ShiftService = ShiftService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(shift_schema_1.Shift.name)),
    __param(1, (0, mongoose_1.InjectModel)(shift_applicant_schema_1.ShiftApplicant.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ShiftService);
//# sourceMappingURL=shift.service.js.map