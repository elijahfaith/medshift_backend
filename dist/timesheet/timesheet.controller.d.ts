import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto, ClockOutDto, UpdateTimesheetStatusDto } from './dto/timesheet.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
export declare class TimesheetController {
    private readonly timesheetService;
    constructor(timesheetService: TimesheetService);
    clockIn(createDto: CreateTimesheetDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/timesheet.schema").TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/timesheet.schema").Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    clockOut(id: string, clockOutDto: ClockOutDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/timesheet.schema").TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/timesheet.schema").Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getByProfessional(professionalId: string, paginationQuery: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/timesheet.schema").TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/timesheet.schema").Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    updateStatus(id: string, updateDto: UpdateTimesheetStatusDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/timesheet.schema").TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/timesheet.schema").Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
