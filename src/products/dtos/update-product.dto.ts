import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  IsOptional,
} from 'class-validator';

export class UpdateProductDto {
  @IsString({ message: 'Name must be a string, this is a custom message' })
  @IsNotEmpty()
  @Length(2, 150) // instead of @MaxLength(100) and @MinLength(3)
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Price shoud not be less than zero' })
  @IsOptional()
  price?: number;
}
