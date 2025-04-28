export class CreateProductDto {
  title: string;
  price: number;
}

/*
  class (not interface or type) ?

  - because we want to use the class-transformer and class-validator decorators
  to validate the incoming data in the DTO class
  - class-transformer is used to transform the incoming data into a class instance
  - class-validator is used to validate the incoming data against the class properties
*/
