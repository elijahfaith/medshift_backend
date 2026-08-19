import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timesheet, TimesheetDocument } from './schemas/timesheet.schema';
import { Shift, ShiftDocument } from '../shift/schemas/shift.schema';
import {
  CreateTimesheetDto,
  ClockOutDto,
  UpdateTimesheetStatusDto,
} from './dto/timesheet.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectModel(Timesheet.name)
    private timesheetModel: Model<TimesheetDocument>,
    @InjectModel(Shift.name)
    private shiftModel: Model<ShiftDocument>,
  ) {}

  async clockIn(createDto: CreateTimesheetDto) {
    const shift = await this.shiftModel.findById(createDto.shiftId).exec();
    if (!shift) throw new NotFoundException('Shift not found');
    
    // Check if accessCode matches either the generated code or QR code data
    if (shift.accessCode !== createDto.accessCode && shift.qrCodeData !== createDto.accessCode) {
      throw new BadRequestException('Invalid Access Code or QR Code');
    }

    const newTimesheet = new this.timesheetModel({
      ...createDto,
      clockInTime: new Date(),
    });
    return newTimesheet.save();
  }

  async clockOut(id: string, clockOutDto: ClockOutDto) {
    const timesheet = await this.timesheetModel.findById(id).exec();
    if (!timesheet) throw new NotFoundException('Timesheet not found');

    const shift = await this.shiftModel.findById(timesheet.shiftId).exec();
    if (!shift) throw new NotFoundException('Shift not found');

    if (shift.accessCode !== clockOutDto.accessCode && shift.qrCodeData !== clockOutDto.accessCode) {
      throw new BadRequestException('Invalid Access Code or QR Code');
    }

    timesheet.clockOutTime = new Date();
    // Simplified hours calculation logic
    const hours =
      Math.abs(
        timesheet.clockOutTime.getTime() - timesheet.clockInTime.getTime(),
      ) / 36e5;
    timesheet.approvedHours = hours;

    return timesheet.save();
  }

  async getTimesheetsByProfessional(
    professionalId: string,
    paginationQuery: PaginationQueryDto,
  ) {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.timesheetModel
        .find({ professionalId })
        .skip(skip)
        .limit(limit)
        .populate('shiftId')
        .exec(),
      this.timesheetModel.countDocuments({ professionalId }).exec(),
    ]);

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async updateTimesheetStatus(id: string, updateDto: UpdateTimesheetStatusDto) {
    const timesheet = await this.timesheetModel
      .findByIdAndUpdate(id, { status: updateDto.status }, { new: true })
      .exec();
    if (!timesheet) throw new NotFoundException('Timesheet not found');
    return timesheet;
  }
}
