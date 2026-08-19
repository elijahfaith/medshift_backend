"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionAuthModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const institution_controller_1 = require("./institution.controller");
const institution_service_1 = require("./institution.service");
const institution_schema_1 = require("./schemas/institution.schema");
let InstitutionAuthModule = class InstitutionAuthModule {
};
exports.InstitutionAuthModule = InstitutionAuthModule;
exports.InstitutionAuthModule = InstitutionAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: institution_schema_1.Institution.name, schema: institution_schema_1.InstitutionSchema }]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'fallback_secret',
                signOptions: { expiresIn: '7d' },
            }),
        ],
        controllers: [institution_controller_1.InstitutionAuthController],
        providers: [institution_service_1.InstitutionAuthService],
    })
], InstitutionAuthModule);
//# sourceMappingURL=institution.module.js.map