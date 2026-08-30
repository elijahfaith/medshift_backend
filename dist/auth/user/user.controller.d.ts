import { UserAuthService } from './user.service';
import { UserRegisterDto, UserLoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto, UpdateProfileDto } from './dto/user.dto';
export declare class UserAuthController {
    private readonly userAuthService;
    constructor(userAuthService: UserAuthService);
    register(registerDto: UserRegisterDto): Promise<{
        Token: string;
        UserId: import("mongoose").Types.ObjectId;
        Email: string;
        FirstName: string;
        LastName: string;
        Status: string;
        OTP: string;
    }>;
    login(loginDto: UserLoginDto): Promise<{
        OTP?: string | undefined;
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
    getProfile(req: any): Promise<{
        id: import("mongoose").Types.ObjectId;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: any;
        professionalDetails: {
            id: import("mongoose").Types.ObjectId;
            profession: string;
            specialty: string;
            isVerified: boolean;
            isListed: boolean;
            rating: number;
            shiftsCompleted: number;
        };
    }>;
    updateProfile(req: any, updateDto: UpdateProfileDto): Promise<{
        id: import("mongoose").Types.ObjectId;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: any;
        professionalDetails: {
            id: import("mongoose").Types.ObjectId;
            profession: string;
            specialty: string;
            isVerified: boolean;
            isListed: boolean;
            rating: number;
            shiftsCompleted: number;
        };
    }>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    uploadCv(req: any, file: any): Promise<{
        url: string;
    }>;
    uploadProfilePicture(req: any, file: any): Promise<{
        url: string;
    }>;
    verifyPayment(req: any, body: {
        reference: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
