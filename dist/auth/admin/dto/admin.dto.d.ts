export declare class AdminRegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    clientType: string;
}
export declare class AdminLoginDto {
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
