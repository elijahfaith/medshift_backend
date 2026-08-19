import {
  IsString,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @IsString()
  type: string = 'Point';

  @IsArray()
  @IsNumber({}, { each: true })
  coordinates: number[]; // [lng, lat]
}

export class CreateShiftDto {
  @IsString()
  organizationId: string;

  @IsString()
  department: string;

  @IsString()
  position: string;

  @IsNumber()
  hourlyRate: number;

  @IsNumber()
  estimatedTotal: number;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsOptional()
  @IsBoolean()
  isUrgent?: boolean;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  @IsNumber()
  minYearsExperience?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;
}

export class UpdateShiftDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsBoolean()
  isUrgent?: boolean;

  @IsOptional()
  @IsString()
  requirements?: string;
}
