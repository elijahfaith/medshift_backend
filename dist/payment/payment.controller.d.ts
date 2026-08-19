import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(createDto: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/payment.schema").EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/payment.schema").EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/payment.schema").EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/payment.schema").EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/payment.schema").EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/payment.schema").EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateStatus(id: string, body: {
        status: string;
        adminNotes?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./schemas/payment.schema").EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/payment.schema").EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
