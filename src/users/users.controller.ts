import { Controller, Get } from '@nestjs/common';

@Controller()
export class UsersController {
  // GET: ~/api/users
  @Get('/api/users')
  public getAllUsers() {
    return [
      { id: 1, name: 'Ahmed', email: 'ahmed@gmail.com' },
      { id: 2, name: 'Ali', email: 'ali@gmail.com' },
    ];
  }
}
