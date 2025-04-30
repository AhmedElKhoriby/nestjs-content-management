import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import { ReviewsModule } from 'src/reviews/reviews.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductService],
  imports: [ReviewsModule], // External Injecting the ReviewsModule into the ProductsModule
})
export class ProductsModule {}
