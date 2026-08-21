export declare class UserRegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profession?: string;
    specialty?: string;
    password: string;
    clientType: string;
}
export declare class UserLoginDto {
    email: string;
    password: string;
    clientType: string;
}
export declare class VerifyOtpDto {
    email: string;
    otp: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    email: string;
    otp: string;
    newPassword: string;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
export declare class UpdateProfileDto {
    firstName?: string;
    lastName?: string;
    phone?: string;
    profession?: string;
    specialty?: string;
    profilePictureUrl?: string | null;
}
