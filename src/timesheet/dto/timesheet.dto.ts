import { IsString } from 'class-validator';

export class CreateTimesheetDto {
  @IsString()
  shiftId: string;

  @IsString()
  professionalId: string;
}

export class UpdateTimesheetStatusDto {
  @IsString()
  status: string;
}
