import { IsString, IsOptional, IsMongoId } from 'class-validator';

export class CreateReportDto {
  @IsMongoId()
  reporterId: string;

  @IsString()
  hospitalName: string;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  comment?: string;
}
