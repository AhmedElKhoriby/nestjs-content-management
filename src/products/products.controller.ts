import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Put,
  Delete,
  Req,
  Res,
  Headers,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { CreateProductDto } from './dtos/create-product.dto';
import type { UpdateProductDto } from './dtos/update-product.dto';

type ProductType = { id: number; name: string; price: number };

@Controller('/api/products')
export class ProductsController {
  private products: ProductType[] = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ];

  // What happens behind the scenes with express?
  // POST: ~/api/products/express-style
  @Post('/express-style')
  public createNewProductExpressStyle(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    // passthrough: true => allows us to modify the response object
    @Headers() headers: any,
  ) {
    const newProduct: ProductType = {
      id: this.products.length + 1,
      name: req.body.title,
      price: req.body.price,
    };

    this.products.push(newProduct);

    console.log('headers', headers); // prefered
    console.log('headers', req.headers);

    // NestJS gives us the ability to use express-style responses
    // But we should avoid using it in NestJS
    // because it goes against the NestJS way of doing things
    // and it makes the code less readable and maintainable

    // But it has its own use cases like
    // res.cookie('cookie-name', 'cookie-value', {
    //   httpOnly: true,
    //   maxAge: 900000,
    // });
    // So we can use it to set cookies, headers, etc. headers: any,
    // But we should avoid using it in most cases

    res.status(201).json(newProduct);
  }

  // POST: ~/api/products
  @Post()
  public createNewProduct(@Body() body: CreateProductDto) {
    const newProduct: ProductType = {
      id: this.products.length + 1,
      name: body.title,
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
  public getSingleProduct(@Param('id') id: string) {
    const product = this.products.find((product) => product.id === +id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  // PUT: ~/api/products/:id
  @Put('/:id')
  public updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ) {
    const product = this.products.find((product) => product.id === +id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    // Update the product with the new data will be in DB
    console.log('body', body);

    return { message: 'Product updated successfully' };
  }

  // DELETE: ~/api/products/:id
  @Delete('/:id')
  public deleteProduct(@Param('id') id: string) {
    const product = this.products.find((product) => product.id === +id);

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

// +id => convert the string to a number = parseInt(id, 10)
