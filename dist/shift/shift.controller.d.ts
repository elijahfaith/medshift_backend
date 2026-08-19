import { ShiftService } from './shift.service';
export declare class ShiftController {
    private readonly shiftService;
    constructor(shiftService: ShiftService);
    create(createDto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/shift.schema").ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shift.schema").Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findNearby(lat: number, lng: number, radius?: number): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/shift.schema").ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shift.schema").Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/shift.schema").ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shift.schema").Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/shift.schema").ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shift.schema").Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateDto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/shift.schema").ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shift.schema").Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    apply(id: string, professionalId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/shift-applicant.schema").ShiftApplicantDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shift-applicant.schema").ShiftApplicant & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getApplicants(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/shift-applicant.schema").ShiftApplicantDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shift-applicant.schema").ShiftApplicant & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
