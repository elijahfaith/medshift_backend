import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { User, UserDocument } from '../auth/user/schemas/user.schema';
import { Institution, InstitutionDocument } from '../auth/institution/schemas/institution.schema';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);

  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Institution.name) private institutionModel: Model<InstitutionDocument>,
  ) {}

  async createReview(createDto: CreateReviewDto) {
    const review = new this.reviewModel(createDto);
    await review.save();
    
    // Update reputation asynchronously
    this._updateReputation(createDto.revieweeId, createDto.type);
    
    return review;
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

    this._updateReputation(review.revieweeId.toString(), review.type);

    return review;
  }

  private async _updateReputation(revieweeId: string, type: 'InstitutionToPro' | 'ProToInstitution') {
    try {
      const stats = await this.reviewModel.aggregate([
        { $match: { revieweeId: new Types.ObjectId(revieweeId) } },
        {
          $group: {
            _id: '$revieweeId',
            averageRating: { $avg: '$rating' },
            totalReviews: { $sum: 1 },
          },
        },
      ]);

      if (stats.length > 0) {
        const { averageRating, totalReviews } = stats[0];
        const avg = Math.round(averageRating * 10) / 10; // 1 decimal place

        if (type === 'InstitutionToPro') {
          await this.userModel.findByIdAndUpdate(revieweeId, {
            rating: avg,
            totalReviews: totalReviews,
          });

          // PUSH NOTIFICATION LOGIC PLACEHOLDER
          // TODO: Configure Firebase Service Account for FCM
          // const user = await this.userModel.findById(revieweeId);
          // if (user && user.fcmToken) {
          //   await firebaseAdmin.messaging().send({
          //     token: user.fcmToken,
          //     notification: {
          //       title: 'New Review Received!',
          //       body: 'A hospital just left a review on your profile.',
          //     },
          //   });
          // }
          this.logger.log(`Placeholder: Push notification sent to user ${revieweeId} for new review.`);
          
        } else if (type === 'ProToInstitution') {
          await this.institutionModel.findByIdAndUpdate(revieweeId, {
            rating: avg,
            totalReviews: totalReviews,
          });
        }
      }
    } catch (e) {
      this.logger.error('Failed to update reputation', e);
    }
  }
}
