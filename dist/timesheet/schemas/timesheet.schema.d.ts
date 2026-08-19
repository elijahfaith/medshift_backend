import { Document, Types } from 'mongoose';
export type TimesheetDocument = Timesheet & Document;
export declare class Timesheet {
    shiftId: Types.ObjectId;
    professionalId: Types.ObjectId;
    clockInTime: Date;
    clockOutTime: Date;
    approvedHours: number;
    calculatedEarnings: number;
    status: string;
}
export declare const TimesheetSchema: import("mongoose").Schema<Timesheet, import("mongoose").Model<Timesheet, any, any, any, any, any, Timesheet>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Timesheet, Document<unknown, {}, Timesheet, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Timesheet & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    shiftId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Timesheet, Document<unknown, {}, Timesheet, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Timesheet & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    professionalId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Timesheet, Document<unknown, {}, Timesheet, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Timesheet & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    clockInTime?: import("mongoose").SchemaDefinitionProperty<Date, Timesheet, Document<unknown, {}, Timesheet, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Timesheet & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    clockOutTime?: import("mongoose").SchemaDefinitionProperty<Date, Timesheet, Document<unknown, {}, Timesheet, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Timesheet & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    approvedHours?: import("mongoose").SchemaDefinitionProperty<number, Timesheet, Document<unknown, {}, Timesheet, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Timesheet & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    calculatedEarnings?: import("mongoose").SchemaDefinitionProperty<number, Timesheet, Document<unknown, {}, Timesheet, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Timesheet & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Timesheet, Document<unknown, {}, Timesheet, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Timesheet & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Timesheet>;
