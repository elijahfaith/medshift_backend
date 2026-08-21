export declare class InstitutionRegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    name: string;
    facilityType: string;
    password: string;
    clientType: string;
}
export declare class InstitutionLoginDto {
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
export declare class OnboardInstitutionDto {
    facilityType: string;
    name: string;
    licenseNumber: string;
    address: string;
}
