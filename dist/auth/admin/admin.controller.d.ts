import { AdminAuthService } from './admin.service';
import { AdminRegisterDto, AdminLoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto } from './dto/admin.dto';
export declare class AdminAuthController {
    private readonly adminAuthService;
    constructor(adminAuthService: AdminAuthService);
    register(registerDto: AdminRegisterDto): Promise<{
        Token: string;
        UserId: import("mongoose").Types.ObjectId;
        Email: string;
        FirstName: string;
        LastName: string;
        Status: string;
        OTP: string;
    }>;
    login(loginDto: AdminLoginDto): Promise<{
        Token: string;
        UserId: import("mongoose").Types.ObjectId;
        Email: string;
        FirstName: string;
        LastName: string;
        Status: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
        Token: string;
        UserId: import("mongoose").Types.ObjectId;
        Email: string;
        FirstName: string;
        LastName: string;
        Status: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
        OTP?: undefined;
    } | {
        message: string;
        OTP: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    getStats(): Promise<{
        activeProfessionals: number;
        pendingVerifications: number;
        escrowHeld: number;
        reportedJobsQueue: number;
        totalInstitutions: number;
    }>;
    getInstitutions(): Promise<(import("mongoose").Document<unknown, {}, import("../institution/schemas/institution.schema").InstitutionDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../institution/schemas/institution.schema").Institution & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateInstitutionStatus(id: string, status: string): Promise<import("mongoose").Document<unknown, {}, import("../institution/schemas/institution.schema").InstitutionDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../institution/schemas/institution.schema").Institution & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getUsers(): Promise<(import("mongoose").Document<unknown, {}, import("../user/schemas/user.schema").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../user/schemas/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateUserVerification(id: string, isVerified: boolean): Promise<import("mongoose").Document<unknown, {}, import("../user/schemas/user.schema").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../user/schemas/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getShifts(): Promise<(import("mongoose").Document<unknown, {}, import("../../shift/schemas/shift.schema").ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../shift/schemas/shift.schema").Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    approveShift(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../shift/schemas/shift.schema").ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../shift/schemas/shift.schema").Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
