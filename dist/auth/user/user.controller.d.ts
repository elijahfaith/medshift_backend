import { UserAuthService } from './user.service';
import { UserRegisterDto, UserLoginDto } from './dto/user.dto';
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
