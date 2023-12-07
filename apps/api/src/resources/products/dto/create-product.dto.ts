import {
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsInt,
  Min,
  IsDecimal,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @MaxLength(250)
  @IsOptional()
  description: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  quantityInStock: number;
}
