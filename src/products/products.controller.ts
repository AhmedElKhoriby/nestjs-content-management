import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

type ProductType = { id: number; name: string; price: number };

@Controller('/api/products')
export class ProductsController {
  private products: ProductType[] = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ];

  // POST: ~/api/products
  @Post()
  public createNewProduct(@Body() body: CreateProductDto) {
    const newProduct: ProductType = {
      id: this.products.length + 1,
      name: body.name,
      price: body.price,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  // GET: ~/api/products
  @Get()
  public getAllProducts() {
    return this.products;
  }

  // GET: ~/api/products/:id
  @Get('/:id')
  public getSingleProduct(@Param('id', ParseIntPipe) id: number) {
    const product = this.products.find((product) => product.id === id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  // PUT: ~/api/products/:id
  @Put('/:id')
  public updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    const product = this.products.find((product) => product.id === id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    // Update the product with the new data will be in DB
    console.log('body', body);

    return { message: 'Product updated successfully' };
  }

  // DELETE: ~/api/products/:id
  @Delete('/:id')
  public deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const product = this.products.find((product) => product.id === id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    // Delete the product with the new data will be in DB

    return { message: 'Product deleted successfully' };
  }
}

// ========================= Notes =========================

// (@Param() param: any) => param.id -> { id: '1' }
// So we can use the id param directly => Destructuring the param object
// @Param('id') => { id: '1' } from this object return the id property

// id => convert the string to a number = parseInt(id, 10)

// ParseIntPipe => convert the string to a number and validate it
// - '1' => 1 / 'abc' => throw bad request exception
