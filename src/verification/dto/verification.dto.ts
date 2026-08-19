import { IsString, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { VerificationStatus } from '../schemas/verification-request.schema';

export class CreateLicensingCouncilDto {
  @IsString()
  name: string;

  @IsString()
  acronym: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateVerificationRequestDto {
  @IsString()
  professionalId: string;

  @IsString()
  licensingCouncilId: string;

  @IsString()
  licenseNumber: string;

  @IsDateString()
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;
}

export class UpdateVerificationStatusDto {
  @IsEnum(VerificationStatus)
  status: VerificationStatus;

  @IsOptional()
  @IsString()
  adminNotes?: string;
}
