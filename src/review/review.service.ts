import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async createReview(createDto: CreateReviewDto) {
    const review = new this.reviewModel(createDto);
    return review.save();
  }

  async getReviewsByUser(
    userId: string,
    type: 'given' | 'received',
    paginationQuery: PaginationQueryDto,
  ) {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;

    const query =
      type === 'given'
        ? { reviewerId: new Types.ObjectId(userId) }
        : { revieweeId: new Types.ObjectId(userId) };

    const [data, total] = await Promise.all([
      this.reviewModel
        .find(query)
        .populate('shiftId')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.reviewModel.countDocuments(query).exec(),
    ]);

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async updateReview(id: string, updateDto: UpdateReviewDto) {
    const review = await this.reviewModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }
}
