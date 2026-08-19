import { Document, Types } from 'mongoose';
export type ShiftApplicantDocument = ShiftApplicant & Document;
export declare class ShiftApplicant {
    shiftId: Types.ObjectId;
    professionalId: Types.ObjectId;
    status: string;
}
export declare const ShiftApplicantSchema: import("mongoose").Schema<ShiftApplicant, import("mongoose").Model<ShiftApplicant, any, any, any, any, any, ShiftApplicant>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ShiftApplicant, Document<unknown, {}, ShiftApplicant, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ShiftApplicant & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    shiftId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ShiftApplicant, Document<unknown, {}, ShiftApplicant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ShiftApplicant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    professionalId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ShiftApplicant, Document<unknown, {}, ShiftApplicant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ShiftApplicant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, ShiftApplicant, Document<unknown, {}, ShiftApplicant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ShiftApplicant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, ShiftApplicant>;
