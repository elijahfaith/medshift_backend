import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto, UpdateShiftDto } from './dto/shift.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Controller('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  async create(@Body() createDto: CreateShiftDto) {
    return this.shiftService.createShift(createDto);
  }

  @Get('nearby')
  async findNearby(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius?: number,
    @Query() paginationQuery: PaginationQueryDto = { page: 1, limit: 10 },
  ) {
    return this.shiftService.getNearbyShifts(
      Number(lat),
      Number(lng),
      radius ? Number(radius) : undefined,
      paginationQuery,
    );
  }

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.shiftService.getShifts(paginationQuery);
  }

  @Get('institution/:id')
  async findByInstitution(
    @Param('id') institutionId: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.shiftService.getShiftsByInstitution(institutionId, paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.shiftService.getShiftById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateShiftDto) {
    return this.shiftService.updateShift(id, updateDto);
  }

  @Post(':id/apply')
  async apply(
    @Param('id') id: string,
    @Body('professionalId') professionalId: string,
  ) {
    return this.shiftService.applyForShift(id, professionalId);
  }

  @Get(':id/applicants')
  async getApplicants(@Param('id') id: string) {
    return this.shiftService.getApplicantsForShift(id);
  }

  @Get('upcoming/:professionalId')
  async getUpcomingShifts(@Param('professionalId') professionalId: string) {
    return this.shiftService.getUpcomingShiftsForProfessional(professionalId);
  }
}
