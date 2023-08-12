import { Transform } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class QueryDto {
  // @Transform(({ value }) => +value)
  // @IsNumber()
  // @IsOptional()
  // id?: number;

  // @Transform(({ value }) => +value)
  // @IsNumber()
  // @IsOptional()
  // quantity?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  rating?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @Transform((a) => {
    const splittedPrices = a.value.split('-');
    return { min: +splittedPrices[0], max: +splittedPrices[1] || +splittedPrices[0] };
  })
  @IsObject()
  @IsOptional()
  priceRange?: { min: number; max: number };
}
