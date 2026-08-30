import { ShiftService } from './shift.service';
import { CreateShiftDto, UpdateShiftDto } from './dto/shift.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
export declare class ShiftController {
    private readonly shiftService;
    constructor(shiftService: ShiftService);
    create(createDto: CreateShiftDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/shift.schema").ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shift.schema").Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findNearby(lat: number, lng: number, radius?: number, paginationQuery?: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/shift.schema").ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shift.schema").Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findAll(paginationQuery: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/shift.schema").ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shift.schema").Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findByInstitution(institutionId: string, paginationQuery: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/shift.schema").ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shift.schema").Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/shift.schema").ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shift.schema").Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateDto: UpdateShiftDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/shift.schema").ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shift.schema").Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    getUpcomingShifts(professionalId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/shift-applicant.schema").ShiftApplicantDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shift-applicant.schema").ShiftApplicant & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
