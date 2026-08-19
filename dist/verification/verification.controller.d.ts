import { VerificationService } from './verification.service';
import { VerificationStatus } from './schemas/verification-request.schema';
export declare class VerificationController {
    private readonly verificationService;
    constructor(verificationService: VerificationService);
    createCouncil(body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/licensing-council.schema").LicensingCouncilDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/licensing-council.schema").LicensingCouncil & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getCouncils(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/licensing-council.schema").LicensingCouncilDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/licensing-council.schema").LicensingCouncil & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    submitRequest(body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/verification-request.schema").VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/verification-request.schema").VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllRequests(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/verification-request.schema").VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/verification-request.schema").VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getRequestById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/verification-request.schema").VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/verification-request.schema").VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateRequestStatus(id: string, body: {
        status: VerificationStatus;
        adminNotes?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./schemas/verification-request.schema").VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/verification-request.schema").VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
