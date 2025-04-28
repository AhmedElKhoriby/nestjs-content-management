import { Controller, Get } from '@nestjs/common';

@Controller()
export class ReviewsController {
  // GET: ~/api/reviews
  @Get('/api/reviews')
  public getAllReviews() {
    return [
      { id: 1, rating: 1, review: 'Great product!' },
      { id: 2, rating: 2, review: 'Not bad' },
      { id: 3, rating: 3, review: 'Could be better' },
    ];
  }
}
