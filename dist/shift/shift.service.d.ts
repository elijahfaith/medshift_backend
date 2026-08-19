import { Model, Types } from 'mongoose';
import { Shift, ShiftDocument } from './schemas/shift.schema';
import { ShiftApplicant, ShiftApplicantDocument } from './schemas/shift-applicant.schema';
export declare class ShiftService {
    private shiftModel;
    private applicantModel;
    constructor(shiftModel: Model<ShiftDocument>, applicantModel: Model<ShiftApplicantDocument>);
    createShift(createDto: any): Promise<import("mongoose").Document<unknown, {}, ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & Shift & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getShifts(): Promise<(import("mongoose").Document<unknown, {}, ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & Shift & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getShiftById(id: string): Promise<import("mongoose").Document<unknown, {}, ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & Shift & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateShift(id: string, updateDto: any): Promise<import("mongoose").Document<unknown, {}, ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & Shift & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    getNearbyShifts(lat: number, lng: number, maxDistanceInMeters?: number): Promise<(import("mongoose").Document<unknown, {}, ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & Shift & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
