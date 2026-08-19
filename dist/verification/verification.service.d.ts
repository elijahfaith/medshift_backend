import { Model } from 'mongoose';
import { LicensingCouncil, LicensingCouncilDocument } from './schemas/licensing-council.schema';
import { VerificationRequest, VerificationRequestDocument, VerificationStatus } from './schemas/verification-request.schema';
export declare class VerificationService {
    private councilModel;
    private requestModel;
    constructor(councilModel: Model<LicensingCouncilDocument>, requestModel: Model<VerificationRequestDocument>);
    createCouncil(createDto: any): Promise<import("mongoose").Document<unknown, {}, LicensingCouncilDocument, {}, import("mongoose").DefaultSchemaOptions> & LicensingCouncil & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getCouncils(): Promise<(import("mongoose").Document<unknown, {}, LicensingCouncilDocument, {}, import("mongoose").DefaultSchemaOptions> & LicensingCouncil & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    submitRequest(createDto: any): Promise<import("mongoose").Document<unknown, {}, VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getRequests(): Promise<(import("mongoose").Document<unknown, {}, VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getRequestById(id: string): Promise<import("mongoose").Document<unknown, {}, VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateRequestStatus(id: string, status: VerificationStatus, adminNotes?: string): Promise<import("mongoose").Document<unknown, {}, VerificationRequestDocument, {}, import("mongoose").DefaultSchemaOptions> & VerificationRequest & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
