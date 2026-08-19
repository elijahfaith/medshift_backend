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
exports.TimesheetController = void 0;
const common_1 = require("@nestjs/common");
const timesheet_service_1 = require("./timesheet.service");
let TimesheetController = class TimesheetController {
    timesheetService;
    constructor(timesheetService) {
        this.timesheetService = timesheetService;
    }
    async clockIn(createDto) {
        return this.timesheetService.clockIn(createDto);
    }
    async clockOut(id) {
        return this.timesheetService.clockOut(id);
    }
    async getByProfessional(professionalId) {
        return this.timesheetService.getTimesheetsByProfessional(professionalId);
    }
    async updateStatus(id, status) {
        return this.timesheetService.updateTimesheetStatus(id, status);
    }
};
exports.TimesheetController = TimesheetController;
__decorate([
    (0, common_1.Post)('clock-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "clockIn", null);
__decorate([
    (0, common_1.Post)(':id/clock-out'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "clockOut", null);
__decorate([
    (0, common_1.Get)('professional/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "getByProfessional", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "updateStatus", null);
exports.TimesheetController = TimesheetController = __decorate([
    (0, common_1.Controller)('timesheet'),
    __metadata("design:paramtypes", [timesheet_service_1.TimesheetService])
], TimesheetController);
//# sourceMappingURL=timesheet.controller.js.map