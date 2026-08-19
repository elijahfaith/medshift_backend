import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InstitutionDocument } from './schemas/institution.schema';
import { InstitutionRegisterDto, InstitutionLoginDto } from './dto/institution.dto';
export declare class InstitutionAuthService {
    private institutionModel;
    private jwtService;
    constructor(institutionModel: Model<InstitutionDocument>, jwtService: JwtService);
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
