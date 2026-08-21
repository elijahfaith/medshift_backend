import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from './schemas/user.schema';
import { UserRegisterDto, UserLoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto, UpdateProfileDto } from './dto/user.dto';
export declare class UserAuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(registerDto: UserRegisterDto): Promise<{
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
    login(loginDto: UserLoginDto): Promise<{
        OTP?: string | undefined;
        Token: string;
        UserId: import("mongoose").Types.ObjectId;
        Email: string;
        FirstName: string;
        LastName: string;
        Status: string;
    }>;
    getProfile(userId: string): Promise<{
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
    updateProfile(userId: string, updateDto: UpdateProfileDto): Promise<{
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
    changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
