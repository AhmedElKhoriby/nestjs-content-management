import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Ahmed', email: 'ahmed@gmail.com' },
    { id: 2, name: 'Ali', email: 'ali@gmail.com' },
  ];

  public getAll() {
    return this.users;
  }
}
