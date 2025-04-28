import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Name must be a string, this is a custom message' })
  @IsNotEmpty()
  @Length(2, 150) // instead of @MaxLength(100) and @MinLength(3)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Price shoud not be less than zero' })
  price: number;
}
