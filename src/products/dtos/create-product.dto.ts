import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Name must be a string, this is a custom message' })
  @IsNotEmpty()
  @Length(2, 150) // instead of @MaxLength(100) and @MinLength(3)
  name: string;

  @IsString()
  @MinLength(5, { message: 'Description should be at least 5 characters long' })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Price shoud not be less than zero' })
  price: number;
}
