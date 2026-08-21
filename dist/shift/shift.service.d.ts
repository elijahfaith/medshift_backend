import { Model, Types } from 'mongoose';
import { Shift, ShiftDocument } from './schemas/shift.schema';
import { ShiftApplicant, ShiftApplicantDocument } from './schemas/shift-applicant.schema';
import { CreateShiftDto, UpdateShiftDto } from './dto/shift.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
export declare class ShiftService {
    private shiftModel;
    private applicantModel;
    constructor(shiftModel: Model<ShiftDocument>, applicantModel: Model<ShiftApplicantDocument>);
    createShift(createDto: CreateShiftDto): Promise<import("mongoose").Document<unknown, {}, ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & Shift & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getShifts(paginationQuery: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & Shift & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    getShiftById(id: string): Promise<import("mongoose").Document<unknown, {}, ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & Shift & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateShift(id: string, updateDto: UpdateShiftDto): Promise<import("mongoose").Document<unknown, {}, ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & Shift & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    applyForShift(shiftId: string, professionalId: string): Promise<import("mongoose").Document<unknown, {}, ShiftApplicantDocument, {}, import("mongoose").DefaultSchemaOptions> & ShiftApplicant & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getApplicantsForShift(shiftId: string): Promise<(import("mongoose").Document<unknown, {}, ShiftApplicantDocument, {}, import("mongoose").DefaultSchemaOptions> & ShiftApplicant & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getUpcomingShiftsForProfessional(professionalId: string): Promise<(import("mongoose").Document<unknown, {}, ShiftApplicantDocument, {}, import("mongoose").DefaultSchemaOptions> & ShiftApplicant & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getNearbyShifts(lat: number, lng: number, maxDistanceInMeters: number | undefined, paginationQuery: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & Shift & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        lastPage: number;
    }>;
}
