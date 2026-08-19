import { Controller, Post, Get, Put, Param, Body, Query } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import {
  CreateTimesheetDto,
  ClockOutDto,
  UpdateTimesheetStatusDto,
} from './dto/timesheet.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Controller('timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @Post('clock-in')
  async clockIn(@Body() createDto: CreateTimesheetDto) {
    return this.timesheetService.clockIn(createDto);
  }

  @Post(':id/clock-out')
  async clockOut(@Param('id') id: string, @Body() clockOutDto: ClockOutDto) {
    return this.timesheetService.clockOut(id, clockOutDto);
  }

  @Get('professional/:id')
  async getByProfessional(
    @Param('id') professionalId: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.timesheetService.getTimesheetsByProfessional(
      professionalId,
      paginationQuery,
    );
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateTimesheetStatusDto,
  ) {
    return this.timesheetService.updateTimesheetStatus(id, updateDto);
  }
}
