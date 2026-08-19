import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AdminDocument } from './schemas/admin.schema';
import { AdminRegisterDto, AdminLoginDto } from './dto/admin.dto';
export declare class AdminAuthService {
    private adminModel;
    private jwtService;
    constructor(adminModel: Model<AdminDocument>, jwtService: JwtService);
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
