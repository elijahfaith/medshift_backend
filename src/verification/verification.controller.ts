import { Controller, Post, Get, Put, Param, Body, Query } from '@nestjs/common';
import { VerificationService } from './verification.service';
import {
  CreateLicensingCouncilDto,
  CreateVerificationRequestDto,
  UpdateVerificationStatusDto,
} from './dto/verification.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('council')
  async createCouncil(@Body() createDto: CreateLicensingCouncilDto) {
    return this.verificationService.createCouncil(createDto);
  }

  @Get('council')
  async getCouncils(@Query() paginationQuery: PaginationQueryDto) {
    return this.verificationService.getCouncils(paginationQuery);
  }

  @Post('request')
  async submitRequest(@Body() createDto: CreateVerificationRequestDto) {
    return this.verificationService.submitRequest(createDto);
  }

  @Get('request')
  async getAllRequests(@Query() paginationQuery: PaginationQueryDto) {
    return this.verificationService.getRequests(paginationQuery);
  }

  @Get('request/:id')
  async getRequestById(@Param('id') id: string) {
    return this.verificationService.getRequestById(id);
  }

  @Put('request/:id/status')
  async updateRequestStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateVerificationStatusDto,
  ) {
    return this.verificationService.updateRequestStatus(id, updateDto);
  }
}
