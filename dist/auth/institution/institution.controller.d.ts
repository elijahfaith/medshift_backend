import { InstitutionAuthService } from './institution.service';
import { InstitutionRegisterDto, InstitutionLoginDto } from './dto/institution.dto';
export declare class InstitutionAuthController {
    private readonly institutionAuthService;
    constructor(institutionAuthService: InstitutionAuthService);
    register(registerDto: InstitutionRegisterDto): Promise<{
        Token: string;
        UserId: import("mongoose").Types.ObjectId;
        Email: string;
        Name: string;
        Status: string;
    }>;
    login(loginDto: InstitutionLoginDto): Promise<{
        Token: string;
        UserId: import("mongoose").Types.ObjectId;
        Email: string;
        Name: string;
        Status: string;
    }>;
}
