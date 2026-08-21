import { Model } from 'mongoose';
import { LicensingCouncil, LicensingCouncilDocument } from './schemas/licensing-council.schema';
import { VerificationRequest, VerificationRequestDocument } from './schemas/verification-request.schema';
import { CreateLicensingCouncilDto, CreateVerificationRequestDto, UpdateVerificationStatusDto } from './dto/verification.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
export declare class VerificationService {
    private councilModel;
    private requestModel;
    constructor(councilModel: Model<LicensingCouncilDocument>, requestModel: Model<VerificationRequestDocument>);
    createCouncil(createDto: CreateLicensingCouncilDto): Promise<import("mongoose").Document<unknown, {}, LicensingCouncilDocument, {}, import("mongoose").DefaultSchemaOptions> & LicensingCouncil & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getCouncils(paginationQuery: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, LicensingCouncilDocument, {}, import("mongoose").DefaultSchemaOptions> & LicensingCouncil & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    submitRequest(createDto: CreateVerificationRequestDto): Promise<import("mongoose").Document<unknown, {}, VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getRequests(paginationQuery: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    getRequestById(id: string): Promise<import("mongoose").Document<unknown, {}, VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateRequestStatus(id: string, updateDto: UpdateVerificationStatusDto): Promise<import("mongoose").Document<unknown, {}, VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
