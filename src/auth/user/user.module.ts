import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthController } from './user.controller';
import { UserAuthService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback_secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService],
})
export class UserAuthModule {}
