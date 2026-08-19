import { Model } from 'mongoose';
import { EscrowPayment, EscrowPaymentDocument } from './schemas/payment.schema';
export declare class PaymentService {
    private paymentModel;
    constructor(paymentModel: Model<EscrowPaymentDocument>);
    createPayment(createDto: any): Promise<import("mongoose").Document<unknown, {}, EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllPayments(): Promise<(import("mongoose").Document<unknown, {}, EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getPaymentById(id: string): Promise<import("mongoose").Document<unknown, {}, EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updatePaymentStatus(id: string, status: string, adminNotes?: string): Promise<import("mongoose").Document<unknown, {}, EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
