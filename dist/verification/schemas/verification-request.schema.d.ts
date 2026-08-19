import { Document, Types } from 'mongoose';
export type VerificationRequestDocument = VerificationRequest & Document;
export declare enum VerificationStatus {
    Draft = "Draft",
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected"
}
export declare class VerificationRequest {
    professionalId: Types.ObjectId;
    licensingCouncilId: Types.ObjectId;
    licenseNumber: string;
    dateOfBirth: Date;
    documentUrl: string;
    status: VerificationStatus;
    adminNotes: string;
}
export declare const VerificationRequestSchema: import("mongoose").Schema<VerificationRequest, import("mongoose").Model<VerificationRequest, any, any, any, any, any, VerificationRequest>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VerificationRequest, Document<unknown, {}, VerificationRequest, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRequest & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    professionalId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, VerificationRequest, Document<unknown, {}, VerificationRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    licensingCouncilId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, VerificationRequest, Document<unknown, {}, VerificationRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    licenseNumber?: import("mongoose").SchemaDefinitionProperty<string, VerificationRequest, Document<unknown, {}, VerificationRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    dateOfBirth?: import("mongoose").SchemaDefinitionProperty<Date, VerificationRequest, Document<unknown, {}, VerificationRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    documentUrl?: import("mongoose").SchemaDefinitionProperty<string, VerificationRequest, Document<unknown, {}, VerificationRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<VerificationStatus, VerificationRequest, Document<unknown, {}, VerificationRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    adminNotes?: import("mongoose").SchemaDefinitionProperty<string, VerificationRequest, Document<unknown, {}, VerificationRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VerificationRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, VerificationRequest>;
