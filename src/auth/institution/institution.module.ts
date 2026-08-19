import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { InstitutionAuthController } from './institution.controller';
import { InstitutionAuthService } from './institution.service';
import { Institution, InstitutionSchema } from './schemas/institution.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Institution.name, schema: InstitutionSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback_secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [InstitutionAuthController],
  providers: [InstitutionAuthService],
})
export class InstitutionAuthModule {}
