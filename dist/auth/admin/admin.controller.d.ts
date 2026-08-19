import { AdminAuthService } from './admin.service';
import { AdminRegisterDto, AdminLoginDto } from './dto/admin.dto';
export declare class AdminAuthController {
    private readonly adminAuthService;
    constructor(adminAuthService: AdminAuthService);
    register(registerDto: AdminRegisterDto): Promise<{
        Token: string;
        UserId: import("mongoose").Types.ObjectId;
        Email: string;
        FirstName: string;
        LastName: string;
        Status: string;
    }>;
    login(loginDto: AdminLoginDto): Promise<{
        Token: string;
        UserId: import("mongoose").Types.ObjectId;
        Email: string;
        FirstName: string;
        LastName: string;
        Status: string;
    }>;
}
