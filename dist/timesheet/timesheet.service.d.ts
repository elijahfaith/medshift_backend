import { Model } from 'mongoose';
import { Timesheet, TimesheetDocument } from './schemas/timesheet.schema';
export declare class TimesheetService {
    private timesheetModel;
    constructor(timesheetModel: Model<TimesheetDocument>);
    clockIn(createDto: any): Promise<import("mongoose").Document<unknown, {}, TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    clockOut(id: string): Promise<import("mongoose").Document<unknown, {}, TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getTimesheetsByProfessional(professionalId: string): Promise<(import("mongoose").Document<unknown, {}, TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateTimesheetStatus(id: string, status: string): Promise<import("mongoose").Document<unknown, {}, TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
