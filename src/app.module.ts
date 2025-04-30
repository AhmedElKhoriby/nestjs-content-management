import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // use dotenv to load environment variables internally
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available everywhere
      envFilePath: `.env.${process.env.NODE_ENV}`, // Path to your .env file
    }),
    ProductsModule,
    ReviewsModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        port: configService.get<number>('DB_PORT'),
        host: configService.get('DB_HOST'),
        synchronize: process.env.NODE_ENV !== 'production', // Synchronize only in development
        entities: [Product],
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
  ],
})
export class AppModule {}
