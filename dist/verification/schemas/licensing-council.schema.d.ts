import { Document } from 'mongoose';
export type LicensingCouncilDocument = LicensingCouncil & Document;
export declare class LicensingCouncil {
    name: string;
    acronym: string;
    description: string;
}
export declare const LicensingCouncilSchema: import("mongoose").Schema<LicensingCouncil, import("mongoose").Model<LicensingCouncil, any, any, any, any, any, LicensingCouncil>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LicensingCouncil, Document<unknown, {}, LicensingCouncil, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<LicensingCouncil & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, LicensingCouncil, Document<unknown, {}, LicensingCouncil, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LicensingCouncil & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    acronym?: import("mongoose").SchemaDefinitionProperty<string, LicensingCouncil, Document<unknown, {}, LicensingCouncil, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LicensingCouncil & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, LicensingCouncil, Document<unknown, {}, LicensingCouncil, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LicensingCouncil & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, LicensingCouncil>;
