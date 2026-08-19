import { TimesheetService } from './timesheet.service';
export declare class TimesheetController {
    private readonly timesheetService;
    constructor(timesheetService: TimesheetService);
    clockIn(createDto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/timesheet.schema").TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/timesheet.schema").Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    clockOut(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/timesheet.schema").TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/timesheet.schema").Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getByProfessional(professionalId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/timesheet.schema").TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/timesheet.schema").Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateStatus(id: string, status: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/timesheet.schema").TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/timesheet.schema").Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
