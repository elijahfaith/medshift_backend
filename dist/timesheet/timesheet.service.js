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
exports.TimesheetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const timesheet_schema_1 = require("./schemas/timesheet.schema");
let TimesheetService = class TimesheetService {
    timesheetModel;
    constructor(timesheetModel) {
        this.timesheetModel = timesheetModel;
    }
    async clockIn(createDto) {
        const newTimesheet = new this.timesheetModel({
            ...createDto,
            clockInTime: new Date(),
        });
        return newTimesheet.save();
    }
    async clockOut(id) {
        const timesheet = await this.timesheetModel.findById(id).exec();
        if (!timesheet)
            throw new common_1.NotFoundException('Timesheet not found');
        timesheet.clockOutTime = new Date();
        const hours = Math.abs(timesheet.clockOutTime.getTime() - timesheet.clockInTime.getTime()) / 36e5;
        timesheet.approvedHours = hours;
        return timesheet.save();
    }
    async getTimesheetsByProfessional(professionalId) {
        return this.timesheetModel.find({ professionalId }).populate('shiftId').exec();
    }
    async updateTimesheetStatus(id, status) {
        const timesheet = await this.timesheetModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
        if (!timesheet)
            throw new common_1.NotFoundException('Timesheet not found');
        return timesheet;
    }
};
exports.TimesheetService = TimesheetService;
exports.TimesheetService = TimesheetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(timesheet_schema_1.Timesheet.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TimesheetService);
//# sourceMappingURL=timesheet.service.js.map