import { Document, Types } from 'mongoose';
export type ShiftDocument = Shift & Document;
export declare class Shift {
    organizationId: Types.ObjectId;
    department: string;
    position: string;
    hourlyRate: number;
    estimatedTotal: number;
    startTime: Date;
    endTime: Date;
    isUrgent: boolean;
    requirements: string;
    minYearsExperience: number;
    status: string;
    location: {
        type: string;
        coordinates: number[];
    };
    accessCode: string;
    qrCodeData: string;
}
export declare const ShiftSchema: import("mongoose").Schema<Shift, import("mongoose").Model<Shift, any, any, any, any, any, Shift>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Shift, Document<unknown, {}, Shift, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    organizationId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Shift, Document<unknown, {}, Shift, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    department?: import("mongoose").SchemaDefinitionProperty<string, Shift, Document<unknown, {}, Shift, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    position?: import("mongoose").SchemaDefinitionProperty<string, Shift, Document<unknown, {}, Shift, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    hourlyRate?: import("mongoose").SchemaDefinitionProperty<number, Shift, Document<unknown, {}, Shift, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    estimatedTotal?: import("mongoose").SchemaDefinitionProperty<number, Shift, Document<unknown, {}, Shift, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    startTime?: import("mongoose").SchemaDefinitionProperty<Date, Shift, Document<unknown, {}, Shift, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    endTime?: import("mongoose").SchemaDefinitionProperty<Date, Shift, Document<unknown, {}, Shift, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isUrgent?: import("mongoose").SchemaDefinitionProperty<boolean, Shift, Document<unknown, {}, Shift, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    requirements?: import("mongoose").SchemaDefinitionProperty<string, Shift, Document<unknown, {}, Shift, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    minYearsExperience?: import("mongoose").SchemaDefinitionProperty<number, Shift, Document<unknown, {}, Shift, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Shift, Document<unknown, {}, Shift, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<{
        type: string;
        coordinates: number[];
    }, Shift, Document<unknown, {}, Shift, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    accessCode?: import("mongoose").SchemaDefinitionProperty<string, Shift, Document<unknown, {}, Shift, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    qrCodeData?: import("mongoose").SchemaDefinitionProperty<string, Shift, Document<unknown, {}, Shift, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shift & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Shift>;
