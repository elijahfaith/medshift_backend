import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from './schemas/user.schema';
import { UserRegisterDto, UserLoginDto } from './dto/user.dto';
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
    }>;
    login(loginDto: UserLoginDto): Promise<{
        Token: string;
        UserId: import("mongoose").Types.ObjectId;
        Email: string;
        FirstName: string;
        LastName: string;
        Status: string;
    }>;
}
