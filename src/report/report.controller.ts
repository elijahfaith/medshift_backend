import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/report.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async createReport(@Body() createDto: CreateReportDto) {
    return this.reportService.createReport(createDto);
  }

  @Get('user/:id')
  async getReportsByUser(@Param('id') userId: string) {
    return this.reportService.getReportsByUser(userId);
  }
}
