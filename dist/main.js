"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const helmet_1 = __importDefault(require("helmet"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { rawBody: true });
    app.set('trust proxy', 1);
    app.use((0, helmet_1.default)({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
    }));
    app.enableCors({ origin: '*' });
    app.use((req, res, next) => {
        const start = Date.now();
        const { method, originalUrl } = req;
        res.on('finish', () => {
            const duration = Date.now() - start;
            const statusCode = res.statusCode;
            const statusEmoji = statusCode >= 200 && statusCode < 400 ? '🟢' : '🔴';
            console.log(`${statusEmoji} [HTTP] ${method} ${originalUrl} ${statusCode} (${duration}ms)`);
        });
        next();
    });
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'uploads'), {
        prefix: '/uploads/',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
//# sourceMappingURL=main.js.map