import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './products.service';

@Controller('/api/products')
export class ProductsController {
  //! @IMPORTANT NOTE: this considered as bad practice, we will fix it in the next commit
  private productService: ProductService = new ProductService();

  // POST: ~/api/products
  @Post()
  public createNewProduct(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  // GET: ~/api/products
  @Get()
  public getAllProducts() {
    return this.productService.getAll();
  }

  // GET: ~/api/products/:id
  @Get('/:id')
  public getSingleProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getOneBy(id);
  }

  // PUT: ~/api/products/:id
  @Put('/:id')
  public updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.update(id, body);
  }

  // DELETE: ~/api/products/:id
  @Delete('/:id')
  public deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
