"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const timesheet_controller_1 = require("./timesheet.controller");
const timesheet_service_1 = require("./timesheet.service");
const timesheet_schema_1 = require("./schemas/timesheet.schema");
const shift_schema_1 = require("../shift/schemas/shift.schema");
let TimesheetModule = class TimesheetModule {
};
exports.TimesheetModule = TimesheetModule;
exports.TimesheetModule = TimesheetModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: timesheet_schema_1.Timesheet.name, schema: timesheet_schema_1.TimesheetSchema },
                { name: shift_schema_1.Shift.name, schema: shift_schema_1.ShiftSchema },
            ]),
        ],
        controllers: [timesheet_controller_1.TimesheetController],
        providers: [timesheet_service_1.TimesheetService],
    })
], TimesheetModule);
//# sourceMappingURL=timesheet.module.js.map