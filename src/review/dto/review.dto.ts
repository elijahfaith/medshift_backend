import { IsString, IsNumber, IsOptional, IsEnum, Min, Max, IsMongoId } from 'class-validator';

export class CreateReviewDto {
  @IsMongoId()
  shiftId: string;

  @IsMongoId()
  reviewerId: string;

  @IsMongoId()
  revieweeId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsEnum(['InstitutionToPro', 'ProToInstitution'])
  type: string;
}

export class UpdateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
