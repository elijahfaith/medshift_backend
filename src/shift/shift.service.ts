import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Shift, ShiftDocument } from './schemas/shift.schema';
import {
  ShiftApplicant,
  ShiftApplicantDocument,
} from './schemas/shift-applicant.schema';
import { CreateShiftDto, UpdateShiftDto } from './dto/shift.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Injectable()
export class ShiftService {
  constructor(
    @InjectModel(Shift.name) private shiftModel: Model<ShiftDocument>,
    @InjectModel(ShiftApplicant.name)
    private applicantModel: Model<ShiftApplicantDocument>,
  ) {}

  async createShift(createDto: CreateShiftDto) {
    const newShift = new this.shiftModel(createDto);
    return newShift.save();
  }

  async getShifts(paginationQuery: PaginationQueryDto) {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.shiftModel.find().skip(skip).limit(limit).exec(),
      this.shiftModel.countDocuments().exec(),
    ]);

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async getShiftById(id: string) {
    const shift = await this.shiftModel.findById(id).exec();
    if (!shift) throw new NotFoundException('Shift not found');
    return shift;
  }

  async updateShift(id: string, updateDto: UpdateShiftDto) {
    const shift = await this.shiftModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!shift) throw new NotFoundException('Shift not found');
    return shift;
  }

  async applyForShift(shiftId: string, professionalId: string) {
    const application = new this.applicantModel({
      shiftId: new Types.ObjectId(shiftId),
      professionalId: new Types.ObjectId(professionalId),
      status: 'Pending',
    });
    return application.save();
  }

  async getApplicantsForShift(shiftId: string) {
    return this.applicantModel
      .find({ shiftId: new Types.ObjectId(shiftId) })
      .populate('professionalId')
      .exec();
  }

  async getNearbyShifts(
    lat: number,
    lng: number,
    maxDistanceInMeters: number = 50000,
    paginationQuery: PaginationQueryDto,
  ) {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;

    const query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: maxDistanceInMeters,
        },
      },
      status: 'Open',
    };

    const [data, total] = await Promise.all([
      this.shiftModel.find(query).skip(skip).limit(limit).exec(),
      this.shiftModel.countDocuments(query).exec(),
    ]);

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}
