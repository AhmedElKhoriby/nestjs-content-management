import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject(forwardRef(() => UsersService)) // Circular dependency
    private readonly usersService: UsersService,
  ) {}

  private reviews = [
    { id: 1, rating: 1, review: 'Great product!' },
    { id: 2, rating: 2, review: 'Not bad' },
    { id: 3, rating: 3, review: 'Could be better' },
  ];

  public getAll() {
    return this.reviews;
  }
}
