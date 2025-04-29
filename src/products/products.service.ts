import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

type ProductType = { id: number; name: string; price: number };

export class ProductService {
  private products: ProductType[] = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ];

  /**
   * Create new product
   */
  public create({ name, price }: CreateProductDto) {
    const newProduct: ProductType = {
      id: this.products.length + 1,
      name,
      price,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  /**
   * Get all products
   */
  public getAll() {
    return this.products;
  }

  /**
   * Get one product by id
   */
  public getOneBy(id: number) {
    const product = this.products.find((product) => product.id === id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  /**
   * Update product
   */
  public update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.products.find((product) => product.id === id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    // Update the product with the new data will be in DB
    console.log(updateProductDto);

    return { message: 'Product updated successfully' };
  }

  /**
   * Delete product
   */
  public delete(id: number) {
    const product = this.products.find((product) => product.id === id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    // Delete the product with the new data will be in DB

    return { message: 'Product deleted successfully' };
  }
}
