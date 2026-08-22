import { Document } from 'mongoose';
export type InstitutionDocument = Institution & Document;
export declare class Institution {
    email: string;
    passwordHash: string;
    name: string;
    facilityType: string;
    address: string;
    phoneNumber: string;
    licenseNumber: string;
    lat: number;
    lng: number;
    isVerified: boolean;
    rating: number;
    totalReviews: number;
    status: string;
    otp?: string;
    otpExpiry?: Date;
}
export declare const InstitutionSchema: import("mongoose").Schema<Institution, import("mongoose").Model<Institution, any, any, any, any, any, Institution>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Institution, Document<unknown, {}, Institution, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    email?: import("mongoose").SchemaDefinitionProperty<string, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    passwordHash?: import("mongoose").SchemaDefinitionProperty<string, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    facilityType?: import("mongoose").SchemaDefinitionProperty<string, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    address?: import("mongoose").SchemaDefinitionProperty<string, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    phoneNumber?: import("mongoose").SchemaDefinitionProperty<string, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    licenseNumber?: import("mongoose").SchemaDefinitionProperty<string, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    lat?: import("mongoose").SchemaDefinitionProperty<number, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    lng?: import("mongoose").SchemaDefinitionProperty<number, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isVerified?: import("mongoose").SchemaDefinitionProperty<boolean, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    rating?: import("mongoose").SchemaDefinitionProperty<number, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    totalReviews?: import("mongoose").SchemaDefinitionProperty<number, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    otp?: import("mongoose").SchemaDefinitionProperty<string | undefined, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    otpExpiry?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Institution, Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Institution>;
