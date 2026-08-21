import { Model } from 'mongoose';
import { EscrowPayment, EscrowPaymentDocument } from './schemas/payment.schema';
import { CreatePaymentDto, UpdatePaymentStatusDto } from './dto/payment.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
export declare class PaymentService {
    private paymentModel;
    constructor(paymentModel: Model<EscrowPaymentDocument>);
    createPayment(createDto: CreatePaymentDto): Promise<import("mongoose").Document<unknown, {}, EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllPayments(paginationQuery: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    getPaymentById(id: string): Promise<import("mongoose").Document<unknown, {}, EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updatePaymentStatus(id: string, updateDto: UpdatePaymentStatusDto): Promise<import("mongoose").Document<unknown, {}, EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
