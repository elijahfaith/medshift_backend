import { InstitutionAuthService } from './institution.service';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';
import { InstitutionRegisterDto, InstitutionLoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto, OnboardInstitutionDto, UpdateInstitutionProfileDto } from './dto/institution.dto';
export declare class InstitutionAuthController {
    private readonly institutionAuthService;
    private readonly cloudinaryService;
    constructor(institutionAuthService: InstitutionAuthService, cloudinaryService: CloudinaryService);
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
    getProfile(req: any): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        facilityType: string;
        licenseNumber: string;
        address: string;
        phone: string;
        isVerified: boolean;
        status: string;
        rating: number;
        totalReviews: number;
        logoUrl: string;
        adminName: string;
    }>;
    updateProfile(req: any, updateDto: UpdateInstitutionProfileDto): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        facilityType: string;
        licenseNumber: string;
        address: string;
        phone: string;
        isVerified: boolean;
        status: string;
        rating: number;
        totalReviews: number;
        logoUrl: string;
        adminName: string;
    }>;
    uploadLogo(req: any, file: any): Promise<{
        url: string;
        filename: any;
    }>;
}
