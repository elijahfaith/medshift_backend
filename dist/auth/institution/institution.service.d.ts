import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InstitutionDocument } from './schemas/institution.schema';
import { InstitutionRegisterDto, InstitutionLoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto, OnboardInstitutionDto } from './dto/institution.dto';
export declare class InstitutionAuthService {
    private institutionModel;
    private jwtService;
    constructor(institutionModel: Model<InstitutionDocument>, jwtService: JwtService);
    register(registerDto: InstitutionRegisterDto): Promise<{
        Token: string;
        InstitutionId: import("mongoose").Types.ObjectId;
        Email: string;
        Name: string;
        Status: string;
        OTP: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
        Token: string;
        InstitutionId: import("mongoose").Types.ObjectId;
        Email: string;
        Name: string;
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
    login(loginDto: InstitutionLoginDto): Promise<{
        Token: string;
        UserId: import("mongoose").Types.ObjectId;
        Email: string;
        Name: string;
        Status: string;
    }>;
    onboard(institutionId: string, onboardDto: OnboardInstitutionDto): Promise<{
        message: string;
        InstitutionId: import("mongoose").Types.ObjectId;
        Status: string;
    }>;
}
