import { InstitutionAuthService } from './institution.service';
import { InstitutionRegisterDto, InstitutionLoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto, OnboardInstitutionDto } from './dto/institution.dto';
export declare class InstitutionAuthController {
    private readonly institutionAuthService;
    constructor(institutionAuthService: InstitutionAuthService);
    register(registerDto: InstitutionRegisterDto): Promise<{
        Token: string;
        InstitutionId: import("mongoose").Types.ObjectId;
        Email: string;
        Name: string;
        Status: string;
        OTP: string;
    }>;
    login(loginDto: InstitutionLoginDto): Promise<{
        Token: string;
        UserId: import("mongoose").Types.ObjectId;
        Email: string;
        Name: string;
        Status: string;
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
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    onboard(req: any, onboardDto: OnboardInstitutionDto): Promise<{
        message: string;
        InstitutionId: import("mongoose").Types.ObjectId;
        Status: string;
    }>;
}
