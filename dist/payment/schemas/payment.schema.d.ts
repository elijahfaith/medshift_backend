import { Document, Types } from 'mongoose';
export type EscrowPaymentDocument = EscrowPayment & Document;
export declare class EscrowPayment {
    timesheetId: Types.ObjectId;
    paystackReference: string;
    amount: number;
    status: string;
    adminNotes: string;
    processedAt: Date;
}
export declare const EscrowPaymentSchema: import("mongoose").Schema<EscrowPayment, import("mongoose").Model<EscrowPayment, any, any, any, any, any, EscrowPayment>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EscrowPayment, Document<unknown, {}, EscrowPayment, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<EscrowPayment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    timesheetId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, EscrowPayment, Document<unknown, {}, EscrowPayment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EscrowPayment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    paystackReference?: import("mongoose").SchemaDefinitionProperty<string, EscrowPayment, Document<unknown, {}, EscrowPayment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EscrowPayment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    amount?: import("mongoose").SchemaDefinitionProperty<number, EscrowPayment, Document<unknown, {}, EscrowPayment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EscrowPayment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, EscrowPayment, Document<unknown, {}, EscrowPayment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EscrowPayment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    adminNotes?: import("mongoose").SchemaDefinitionProperty<string, EscrowPayment, Document<unknown, {}, EscrowPayment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EscrowPayment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    processedAt?: import("mongoose").SchemaDefinitionProperty<Date, EscrowPayment, Document<unknown, {}, EscrowPayment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EscrowPayment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, EscrowPayment>;
