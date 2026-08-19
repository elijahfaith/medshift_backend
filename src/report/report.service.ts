import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Report, ReportDocument } from './schemas/report.schema';
import { CreateReportDto } from './dto/report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
  ) {}

  async createReport(createDto: CreateReportDto) {
    const ticketNumber = `REP-${Date.now().toString().slice(-6)}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`;
    
    const report = new this.reportModel({
      ...createDto,
      ticketNumber,
    });
    return report.save();
  }

  async getReportsByUser(userId: string) {
    return this.reportModel
      .find({ reporterId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
  }
}
