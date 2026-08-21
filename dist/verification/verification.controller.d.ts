import { VerificationService } from './verification.service';
import { CreateLicensingCouncilDto, CreateVerificationRequestDto, UpdateVerificationStatusDto } from './dto/verification.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
export declare class VerificationController {
    private readonly verificationService;
    constructor(verificationService: VerificationService);
    createCouncil(createDto: CreateLicensingCouncilDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/licensing-council.schema").LicensingCouncilDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/licensing-council.schema").LicensingCouncil & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getCouncils(paginationQuery: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/licensing-council.schema").LicensingCouncilDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/licensing-council.schema").LicensingCouncil & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    submitRequest(createDto: CreateVerificationRequestDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/verification-request.schema").VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/verification-request.schema").VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllRequests(paginationQuery: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/verification-request.schema").VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/verification-request.schema").VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    getRequestById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/verification-request.schema").VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/verification-request.schema").VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateRequestStatus(id: string, updateDto: UpdateVerificationStatusDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/verification-request.schema").VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/verification-request.schema").VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
