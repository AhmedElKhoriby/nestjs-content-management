import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  IsOptional,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsString({ message: 'Name must be a string, this is a custom message' })
  @IsNotEmpty()
  @Length(2, 150) // instead of @MaxLength(100) and @MinLength(3)
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'Description should be at least 5 characters long' })
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Price shoud not be less than zero' })
  @IsOptional()
  price?: number;
}
