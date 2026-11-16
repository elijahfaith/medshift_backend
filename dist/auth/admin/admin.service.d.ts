import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AdminDocument } from './schemas/admin.schema';
import { Institution, InstitutionDocument } from '../institution/schemas/institution.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Shift, ShiftDocument } from '../../shift/schemas/shift.schema';
import { ReportDocument } from '../../report/schemas/report.schema';
import { AdminRegisterDto, AdminLoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto } from './dto/admin.dto';
export declare class AdminAuthService {
    private adminModel;
    private institutionModel;
    private userModel;
    private shiftModel;
    private reportModel;
    private jwtService;
    constructor(adminModel: Model<AdminDocument>, institutionModel: Model<InstitutionDocument>, userModel: Model<UserDocument>, shiftModel: Model<ShiftDocument>, reportModel: Model<ReportDocument>, jwtService: JwtService);
    register(registerDto: AdminRegisterDto): Promise<{
        Token: string;
        UserId: import("mongoose").Types.ObjectId;
        Email: string;
        FirstName: string;
        LastName: string;
        Status: string;
        OTP: string;
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
    resetPassword(resetDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    login(loginDto: AdminLoginDto): Promise<{
        Token: string;
        UserId: import("mongoose").Types.ObjectId;
        Email: string;
        FirstName: string;
        LastName: string;
        Status: string;
    }>;
    getDashboardOverview(): Promise<{
        activeProfessionals: number;
        pendingVerifications: number;
        escrowHeld: number;
        reportedJobsQueue: number;
        totalInstitutions: number;
    }>;
    getAllInstitutions(): Promise<(import("mongoose").Document<unknown, {}, InstitutionDocument, {}, import("mongoose").DefaultSchemaOptions> & Institution & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateInstitutionStatus(institutionId: string, status: string): Promise<import("mongoose").Document<unknown, {}, InstitutionDocument, {}, import("mongoose").DefaultSchemaOptions> & Institution & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, UserDocument, {}, import("mongoose").DefaultSchemaOptions> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateUserVerification(userId: string, isVerified: boolean): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, import("mongoose").DefaultSchemaOptions> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllShifts(): Promise<(import("mongoose").Document<unknown, {}, ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    approveShiftListing(shiftId: string): Promise<import("mongoose").Document<unknown, {}, ShiftDocument, {}, import("mongoose").DefaultSchemaOptions> & Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
