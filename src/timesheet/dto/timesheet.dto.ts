import { IsString, IsOptional } from 'class-validator';

export class CreateTimesheetDto {
  @IsString()
  shiftId: string;

  @IsString()
  professionalId: string;

  @IsString()
  accessCode: string;
}

export class ClockOutDto {
  @IsString()
  accessCode: string;
}

export class UpdateTimesheetStatusDto {
  @IsString()
  status: string;
}
