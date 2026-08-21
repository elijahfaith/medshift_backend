import { PaymentService } from './payment.service';
import { CreatePaymentDto, UpdatePaymentStatusDto } from './dto/payment.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(createDto: CreatePaymentDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/payment.schema").EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/payment.schema").EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAll(paginationQuery: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/payment.schema").EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/payment.schema").EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    getById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/payment.schema").EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/payment.schema").EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateStatus(id: string, updateDto: UpdatePaymentStatusDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/payment.schema").EscrowPaymentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/payment.schema").EscrowPayment & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
