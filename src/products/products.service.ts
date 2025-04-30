import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  /**
   * Create new product
   */
  public async create(dto: CreateProductDto) {
    const newProduct = this.productsRepository.create(dto);
    return await this.productsRepository.save(newProduct);
  }

  /**
   * Get all products
   */
  public getAll() {
    return this.productsRepository.find();
    // it will work without async/await
    // Because TypeORM's find method returns a Promise, and the NestJS framework handles the promise resolution for you.
    // So you can return the result of the find method directly, and NestJS will take care of sending the response to the client.
  }

  /**
   * Get one product by id
   */
  public async getOneBy(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  /**
   * Update product
   */
  public async update(id: number, dto: UpdateProductDto) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    product.name = dto.name ?? product.name;
    product.description = dto.description ?? product.description;
    product.price = dto.price ?? product.price;

    return this.productsRepository.save(product);
  }

  /**
   * Delete product
   */
  public async delete(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    await this.productsRepository.delete(id);
    return { message: `Product with id ${id} deleted`, product };
  }
}
