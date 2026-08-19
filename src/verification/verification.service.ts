import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  LicensingCouncil,
  LicensingCouncilDocument,
} from './schemas/licensing-council.schema';
import {
  VerificationRequest,
  VerificationRequestDocument,
  VerificationStatus,
} from './schemas/verification-request.schema';
import {
  CreateLicensingCouncilDto,
  CreateVerificationRequestDto,
  UpdateVerificationStatusDto,
} from './dto/verification.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Injectable()
export class VerificationService {
  constructor(
    @InjectModel(LicensingCouncil.name)
    private councilModel: Model<LicensingCouncilDocument>,
    @InjectModel(VerificationRequest.name)
    private requestModel: Model<VerificationRequestDocument>,
  ) {}

  // Council Methods
  async createCouncil(createDto: CreateLicensingCouncilDto) {
    const council = new this.councilModel(createDto);
    return council.save();
  }

  async getCouncils(paginationQuery: PaginationQueryDto) {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.councilModel.find().skip(skip).limit(limit).exec(),
      this.councilModel.countDocuments().exec(),
    ]);

    return { data, total, page, lastPage: Math.ceil(total / limit) };
  }

  // Verification Request Methods
  async submitRequest(createDto: CreateVerificationRequestDto) {
    const request = new this.requestModel({
      ...createDto,
      status: VerificationStatus.Pending,
    });
    return request.save();
  }

  async getRequests(paginationQuery: PaginationQueryDto) {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.requestModel
        .find()
        .skip(skip)
        .limit(limit)
        .populate('professionalId')
        .populate('licensingCouncilId')
        .exec(),
      this.requestModel.countDocuments().exec(),
    ]);

    return { data, total, page, lastPage: Math.ceil(total / limit) };
  }

  async getRequestById(id: string) {
    const request = await this.requestModel
      .findById(id)
      .populate('professionalId')
      .populate('licensingCouncilId')
      .exec();
    if (!request) throw new NotFoundException('Request not found');
    return request;
  }

  async updateRequestStatus(
    id: string,
    updateDto: UpdateVerificationStatusDto,
  ) {
    const request = await this.requestModel.findById(id).exec();
    if (!request) throw new NotFoundException('Request not found');

    request.status = updateDto.status;
    if (updateDto.adminNotes) request.adminNotes = updateDto.adminNotes;

    return request.save();
  }
}
