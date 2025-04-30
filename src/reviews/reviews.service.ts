import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsService {
  private reviews = [
    { id: 1, rating: 1, review: 'Great product!' },
    { id: 2, rating: 2, review: 'Not bad' },
    { id: 3, rating: 3, review: 'Could be better' },
  ];

  public getAll() {
    return this.reviews;
  }
}
