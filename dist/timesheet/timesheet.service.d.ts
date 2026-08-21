import { Model } from 'mongoose';
import { Timesheet, TimesheetDocument } from './schemas/timesheet.schema';
import { ShiftDocument } from '../shift/schemas/shift.schema';
import { CreateTimesheetDto, ClockOutDto, UpdateTimesheetStatusDto } from './dto/timesheet.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
export declare class TimesheetService {
    private timesheetModel;
    private shiftModel;
    constructor(timesheetModel: Model<TimesheetDocument>, shiftModel: Model<ShiftDocument>);
    clockIn(createDto: CreateTimesheetDto): Promise<import("mongoose").Document<unknown, {}, TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    clockOut(id: string, clockOutDto: ClockOutDto): Promise<import("mongoose").Document<unknown, {}, TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getTimesheetsByProfessional(professionalId: string, paginationQuery: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    updateTimesheetStatus(id: string, updateDto: UpdateTimesheetStatusDto): Promise<import("mongoose").Document<unknown, {}, TimesheetDocument, {}, import("mongoose").DefaultSchemaOptions> & Timesheet & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
