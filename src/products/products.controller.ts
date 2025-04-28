import { Controller, Get } from '@nestjs/common';

@Controller()
export class ProductsController {
  // GET: ~/api/products
  @Get('/api/products')
  public getAllProducts() {
    return [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
      { id: 3, name: 'Product 3', price: 300 },
    ];
  }
}
