import { Controller, Post, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(@Body() createDto: CreateReviewDto) {
    return this.reviewService.createReview(createDto);
  }

  @Get('user/:id')
  async getReviewsByUser(
    @Param('id') userId: string,
    @Query('type') type: 'given' | 'received',
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.reviewService.getReviewsByUser(userId, type, paginationQuery);
  }

  @Put(':id')
  async updateReview(
    @Param('id') id: string,
    @Body() updateDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(id, updateDto);
  }
}
